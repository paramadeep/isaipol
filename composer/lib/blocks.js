import PropTypes from 'prop-types'

const Blocks = ({ domainBlocks }) => {
  return <>
    <text> {domainBlocks} </text>
  </>
}
export default Blocks

Blocks.prototype = {
  domainBlocks: PropTypes.string
}
