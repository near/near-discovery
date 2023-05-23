import * as React from "react"

const IconEmailSignup = (props: React.PropsWithChildren) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <path fill="#1B1B18" d="M35 8.75 20 22.5 5 8.75h30Z" opacity={0.2} />
        <path
            fill="#1B1B18"
            d="M35 7.5H5a1.25 1.25 0 0 0-1.25 1.25V30a2.5 2.5 0 0 0 2.5 2.5h27.5a2.5 2.5 0 0 0 2.5-2.5V8.75A1.25 1.25 0 0 0 35 7.5ZM20 20.805 8.214 10h23.572L20 20.805ZM15.423 20 6.25 28.408V11.592L15.423 20Zm1.85 1.695 1.875 1.727a1.25 1.25 0 0 0 1.691 0l1.875-1.727L31.777 30H8.214l9.06-8.305ZM24.577 20l9.173-8.41v16.82L24.577 20Z"
        />
    </svg>
)
export default IconEmailSignup
