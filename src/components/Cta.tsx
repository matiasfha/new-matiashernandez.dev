import tw from 'twin.macro'
import Link from '@/components/Link'

const Cta = tw(Link)`
  text-white no-underline leading-5 font-muli
  text-xs
  px-4
  md:text-base
  md:px-6
  font-bold
  bg-red rounded-md py-3 ml-6 transition duration-500 ease-in-out transform hover:scale-125
`

export default Cta
