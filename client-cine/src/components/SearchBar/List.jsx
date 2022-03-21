import { useNavigate } from "react-router-dom";
import s from './search.module.css'

export const List = ({ array }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/MovieDetails/${id}`, { replace: true });
  }

  return (
    <ul className={s.list}>
      {array && array.map(elem => {
        return <li key={elem.id}
          onClick={() => handleClick(elem.id)}
          className={s.item_list}
        >
          {elem.titulo}
        </li>
      })}
    </ul>
  )
}