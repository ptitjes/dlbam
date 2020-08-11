import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"

import { ClassGrid, ClassRegistrationForm, ClassTypeProvider } from "../../components/classes"
import { SimplePageContent } from "../../components/layout"
import { ClassType, Page, getAllClassTypes, getAllPages, getClassTypeBySlug, getPageBySlug } from "../../lib/api"
import { throwError } from "../../lib/utils"

const SECTION_SLUG = "classes"

type ClassPageProps = {
  classType?: ClassType
  page?: Page
}

const classPageComponents = {
  "class-grid": ClassGrid,
  "class-registration-form": ClassRegistrationForm,
}

const ClassPage: NextPage<ClassPageProps> = ({ page, classType }) => {
  if (page) return <SimplePageContent pageContent={page} />

  if (classType) {
    return (
      <ClassTypeProvider classType={classType}>
        <SimplePageContent pageContent={classType} toc={true} components={classPageComponents} />
      </ClassTypeProvider>
    )
  }

  throwError("No page or class type")
}

export const getStaticProps: GetStaticProps<ClassPageProps> = async ({ params, preview }) => {
  const slug = (params ? params["slug"] : "") as string

  const page = await getPageBySlug(slug, preview)
  if (page) return { props: { page }, revalidate: 1 }

  const classType = await getClassTypeBySlug(slug, preview)
  if (classType) return { props: { classType }, revalidate: 1 }

  throwError("No page or class type")
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPages(SECTION_SLUG)
  const classTypes = await getAllClassTypes()
  const paths = [
    ...pages.map((page) => `/${SECTION_SLUG}/${page.slug}`),
    ...classTypes.map((classType) => `/${SECTION_SLUG}/${classType.slug}`),
  ]
  return { paths, fallback: true }
}

export default ClassPage
