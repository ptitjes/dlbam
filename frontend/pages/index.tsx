import { GetStaticProps, NextPage } from "next"
import React from "react"

import Markdown from "../components/Markdown"
import { Banner, Container } from "../components/layout"
import { FrontMatter, getFrontMatter } from "../lib/api"

interface HomePageProps {
  frontMatter: FrontMatter
}

const Home: NextPage<HomePageProps> = ({ frontMatter }) => {
  const { content } = frontMatter

  return (
    <>
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
