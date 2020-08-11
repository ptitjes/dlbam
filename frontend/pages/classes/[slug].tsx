import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React, { createContext, useContext } from "react"

import Markdown from "../../components/Markdown"
import SimplePage from "../../components/SimplePage"
import { ClassGrid, ClassRegistrationForm } from "../../components/classes"
import { Banner, Container } from "../../components/layout"
import { PageSeo } from "../../components/seo"
import { ClassType, Page, getAllClassTypes, getAllPages, getClassTypeBySlug, getPageBySlug } from "../../lib/api"

const SECTION_SLUG = "classes"

const ClassTypeContext = createContext<ClassType | undefined>(undefined)

export function useClassTypeContext() {
  const context = useContext(ClassTypeContext)
  if (!context) throw new Error("No ClassTypeContext!")
  return context
}

interface ClassPageProps {
  classType?: ClassType
  page?: Page
}

const ClassPage: NextPage<ClassPageProps> = ({ page, classType }) => {
  if (page) return <SimplePage page={page} />

  if (!classType) throw new Error("No class type")

  const { title, image, imagePosition, description } = classType
  return (
    <>
      <PageSeo title={title} description={`Les informations sur les cours de danses blues – ${title}`} image={image} />
      <Banner title={title} image={image} imagePosition={imagePosition} />
      <Container>
        <ClassTypeContext.Provider value={classType}>
          <Markdown
            content={description}
            toc={true}
            components={{ "class-grid": ClassGrid, "class-registration-form": ClassRegistrationForm }}
          />
        </ClassTypeContext.Provider>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<ClassPageProps> = async ({ params }) => {
  const slug = (params ? params["slug"] : "") as string

  const page = await getPageBySlug(slug)
  if (page) return { props: { page } }

  const classType = await getClassTypeBySlug(slug)
  if (classType) return { props: { classType } }

  throw new Error("Unknown page")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages(SECTION_SLUG)
  const classTypes = await getAllClassTypes()
  const paths = [
    ...pages.map((page) => `/${SECTION_SLUG}/${page.slug}`),
    ...classTypes.map((classType) => `/${SECTION_SLUG}/${classType.slug}`),
  ]
  return { paths, fallback: false }
}

export default ClassPage
