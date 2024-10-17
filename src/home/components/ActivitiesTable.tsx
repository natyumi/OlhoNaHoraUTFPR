import { Activities } from "../Home";

interface IActivityTable {
  activities: Activities[]
}

export default function ActivityTable({ activities }: IActivityTable) {
  return (
    <div>
      {activities.length > 0 ? (
        <table className="table">
          <thead className=' bg-secondary-100'>
            <tr>
              <th>Nome</th>
              <th>Pontos</th>
              <th>Certificado</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity, index) => {
              return (
                <tr key={index}>
                  <td>{activity.name}</td>
                  <td>{activity.points}</td>
                  <td>{activity.image}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>Você ainda não possui atividades nessa categoria</p>
      )}
    </div>
  );
}