import React from 'react'
import tw, { styled } from 'twin.macro'
import Link from '@/components/Link'

const Container = styled.div`
  ${tw`relative rounded-md`}
  box-shadow: 0 1px 20px 0 rgba(17,17,17,0.31);
`

const TitleContainer = styled.div`
  ${tw`p-6`}
  box-shadow: 0 1px 11px 0 rgba(17,17,17,0.13);
  h2 {
    ${tw`text-dark font-chivo font-bold text-3xl leading-10 my-0`}
  }
  p {
    ${tw`text-dark text-sm font-muli mb-0 mt-2`}
  }
`

const Episodes = tw.ul`
  overflow-y-auto h-72 px-0 my-0
`

const Episode = styled.li`
  ${tw`list-none`}
  a {
    ${tw`no-underline grid grid-cols-10 gap-1 justify-center items-center transition duration-500 ease-in-out hover:bg-gray-200 py-2 px-6 h-20`}
  }
  img {
    ${tw`col-span-3 md:col-span-1 h-12 w-12 rounded-md self-center`}
  }
  div {
    ${tw`col-span-7`}
  }
  h4 {
    ${tw`text-dark text-sm leading-6 font-bold font-muli m-0`}
  }
  span {
    ${tw`text-dark text-xs leading-5 font-muli`}
  }
`

type EpisodeT = {
  id: string
  audio_url: string
  title: string
  published_at: string
  slug: string
  remoteImage: {
    childImageSharp: {
      fluid: {
        src: string
      }
    }
  }
}
type PropsT = {
  episodes: Array<EpisodeT>
  content: string
}

const getLink = (slug: string) => {
  const [, , ...title] = slug.split('-')
  return `episodios/${title.join('-').toLowerCase()}`
}

const Playlist: React.FC<PropsT> = ({ episodes, content }: PropsT) => {
  return (
    <Container>
      <TitleContainer>
        <h2>Episodios</h2>
        <p>{content}</p>
      </TitleContainer>
      <Episodes>
        {episodes.map((node: EpisodeT) => (
          <Episode key={node.id}>
            <Link to={getLink(node.slug)}>
              <img
                src={node.remoteImage.childImageSharp.fluid.src}
                alt={node.title}
              />
              <div>
                <h4>{node.title}</h4>
                <span>{node.published_at}</span>
              </div>
            </Link>
          </Episode>
        ))}
      </Episodes>
    </Container>
  )
}

export default Playlist
