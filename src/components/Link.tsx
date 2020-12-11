import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link: React.FC<{ to: string }> = ({
  children,
  to,
  ...other
}: {
  to: string
}) => {
  const internal = /^\/(?!\/)/.test(to)

  if (internal) {
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    )
  }

  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}

export default Link
