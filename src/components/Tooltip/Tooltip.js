import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

export default function Tooltip({
    children = null,
    ...props
}) {
    return (
        <Tippy {...props}>
            {children}
        </Tippy>
    )
}