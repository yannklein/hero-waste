import { MouseEventHandler } from "react";

type Props = {
  name: String;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const Button: React.FC<Props> = (props) => {
  return (
    <>
    <a onClick={props.onClick} className="button" href={props.href}>{props.name}</a>
    <style>{`
    .button {
      font-size: 32px;
      right: 16px;
      top: 8px;
      color: white;
      text-decoration: none;
      display: inline-block;
      border-radius: 30px;
      background: #086634;
      padding: 16px 32px;
      width: fit-content;
      margin-top: 16px;
    }
    `}</style>
    </>
  )
}

export default Button;