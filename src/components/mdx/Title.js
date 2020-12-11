import tw, { styled } from 'twin.macro'

export default styled.h1`
  ${tw`text-black text-2xl md:text-4xl font-chivo font-bold text-left self-center`}
  span {
    ${tw`no-underline text-red hover:underline cursor-pointer`}
  }
`
