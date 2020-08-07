import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import React from "react"
import styled from "styled-components"

import { Banner } from "../../components/Banner"
import { Container } from "../../components/Container"
import SimplePage from "../../components/SimplePage"
import { breakpoints } from "../../components/theme"
import { Class, ClassType, Page, getAllClassTypes, getAllPages, getClassTypeBySlug, getPageBySlug } from "../../lib/api"

const SECTION_SLUG = "classes"

const ClassGridStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;
  row-gap: 16px;

  li {
    padding: 8px;
    border-radius: 16px;
    border: solid 0.5px #e1e1e3;
    box-shadow: 2px 2px 10px #e1e1e3;
  }

  @media (min-width: ${breakpoints.small}px) {
    &.odd-count li:first-child {
      grid-column-end: span 2;
    }
  }

  h2,
  p {
    margin: 4px;
  }
`

const ClassGrid: React.FC<{ classes: Class[] }> = ({ classes }) => {
  return (
    <ClassGridStyles className={classes.length % 2 === 1 ? "odd-count" : ""}>
      {classes.map((c) => (
        <li key={c.id}>
          <div>
            <h2>{c.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: c.description }} />
          </div>
        </li>
      ))}
    </ClassGridStyles>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  column-gap: 16px;

  @media (min-width: ${breakpoints.small}px) {
    & > .full-row {
      grid-column-end: span 2;
    }
  }
`

const ClassRegistrationForm: React.FC<{ classType: ClassType }> = ({ classType }) => {
  const { slug, classes } = classType

  return (
    <Form>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="firstname" />
        <label>Prénom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="lastname" />
        <label>Nom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label full-row">
        <input type="text" name="email" />
        <label>Courriel</label>
      </div>
      <div className="full-row">
        <h3>Selectionnez les cours souhaités :</h3>
        {classes.map(({ id, title }) => (
          <div key={id} className="mui-checkbox">
            <label>
              <input type="checkbox" name={`${slug}-${id.toString()}`} />
              {title}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="mui-btn mui-btn--primary full-row">
        Envoyer
      </button>
    </Form>
  )
}

interface ClassPageProps {
  classType?: ClassType
  page?: Page
}

const ClassPage: NextPage<ClassPageProps> = ({ page, classType }) => {
  if (page) return <SimplePage page={page} />

  if (!classType) throw new Error("No class type")

  const { title, image, imagePosition, description, classes } = classType
  return (
    <>
      <Banner title={title} imagePath={image && image.url} imagePosition={imagePosition} />
      <Container>
        <div dangerouslySetInnerHTML={{ __html: description }} />

        <ClassGrid classes={classes} />

        <h1>Inscription</h1>
        <ClassRegistrationForm classType={classType} />
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
