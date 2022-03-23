import { useNavigate, Link } from "react-router-dom";
import s from './search.module.css'

export const List = ({ array }) => {
  const navigate = useNavigate();

  return (
    <ul className={s.list}>
      {array && array.map(elem => {
        return <li key={elem.id} className={s.item_list}>
          <Link to={`MovieDetails/${elem.id}`}>{elem.titulo}</Link>
        </li>
      })}
    </ul>
  )
}