import { Activities } from '../Home'
import { LuDownload } from 'react-icons/lu'
import { MdModeEditOutline } from 'react-icons/md'
import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import DeleteActivityModal from '../DeleteActivityModal'

interface IActivityTable {
  activities: Activities[]
  fetchActivities: (userId: string) => void
}

export default function ActivityTable({
  activities,
  fetchActivities,
}: IActivityTable) {
  const [openDeleteActivityModal, setOpenDeleteActivityModal] =
    useState<boolean>(false)
  const [activity, setActivity] = useState<Activities>({
    name: '',
    group: '',
    points: 0,
    description: '',
    start: '',
    end: '',
    duration: '',
    image: '',
    id: '',
    imageBuffer: new ArrayBuffer(0),
  })

  return (
    <div>
      {activities.length > 0 ? (
        <table className="table">
          <thead className=" bg-secondary-100">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Pontos</th>
              <th>Início</th>
              <th>Término</th>
              <th>Duração</th>
              <th>Certificado</th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity, index) => {
              return (
                <tr key={index}>
                  <td>{activity.name}</td>
                  <td>{activity.description}</td>
                  <td>{activity.points}</td>
                  <td>{activity.start}</td>
                  <td>{activity.end}</td>
                  <td>{activity.duration}</td>
                  <td>
                    <a
                      href={activity.image}
                      target="_blank"
                      className="flex flex-row items-center gap-2 tooltip tooltip-top"
                      data-tip="Baixar arquivo"
                    >
                      <button className="btn btn-xs btn-primary">
                        <LuDownload />
                      </button>
                    </a>
                  </td>
                  <td>
                    <div className="flex flex-row items-center gap-6">
                      <button
                        className="tooltip btn btn-ghost btn-sm p-0"
                        data-tip="Editar atividade"
                      >
                        <MdModeEditOutline />
                      </button>
                      <button
                        className="tooltip btn btn-ghost btn-sm p-0"
                        data-tip="Excluir atividade"
                        onClick={() => {
                          setOpenDeleteActivityModal(true)
                          setActivity(activity)
                        }}
                      >
                        <FiTrash2 className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p>Você ainda não possui atividades nessa categoria</p>
      )}
      <DeleteActivityModal
        open={openDeleteActivityModal}
        onClose={() => setOpenDeleteActivityModal(false)}
        activity={activity}
        fetchActivities={fetchActivities}
      />
    </div>
  )
}
