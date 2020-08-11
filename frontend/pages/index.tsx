import { GetStaticProps, NextPage } from "next"
import React from "react"

import Markdown from "../components/Markdown"
import { Banner, Container } from "../components/layout"
import { PageSeo } from "../components/seo"
import { FrontMatter, getFrontMatter } from "../lib/api"

interface HomePageProps {
  frontMatter: FrontMatter
}

const Home: NextPage<HomePageProps> = ({ frontMatter }) => {
  const { description, content } = frontMatter

  return (
    <>
      <PageSeo description={description} />
      <Banner imagePath="/uploads/notre_dame_de_la_garde_e1073e7241.jpg" imagePosition="center 20%" />
      <Container>
        <Markdown content={content} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const frontMatter = await getFrontMatter()
  return { props: { frontMatter } }
}

export default Home
