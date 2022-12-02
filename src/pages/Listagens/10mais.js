import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiCalendar } from "react-icons/fi";

export default function DezMais() {


  return (
    <div>

      <Header />

      <div className="content">
        <Title name="Listagem">
          <FiCalendar color="#ecafb1" size={25} />
        </Title>
      </div>

      </div>
      )
}