import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { FaFileExport } from 'react-icons/fa6'
import { database } from '../firebase'
import { onValue, ref } from 'firebase/database'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import Progression from './components/Progression'
import ActivityTable from './components/ActivitiesTable'
import { generateFromUrl } from './wordData'
import { useAuthStore } from '../store/auth.store'
import CreateEditActivityModal from './CreateEditActivityModal'

export interface Activities {
  name: string
  group: string
  points: string
  description: string
  start?: string
  end?: string
  duration?: string
  image: string
  imageName: string
  id: string
  imageBuffer: ArrayBuffer
}

export default function Home() {
  const [openNewActivity, setOpenNewActivity] = useState<boolean>(false)
  const [allG1Points, setAllG1Points] = useState<number>(0)
  const [allG2Points, setAllG2Points] = useState<number>(0)
  const [allG3Points, setAllG3Points] = useState<number>(0)
  const [activitiesG1, setActivitiesG1] = useState<Activities[]>([])
  const [activitiesG2, setActivitiesG2] = useState<Activities[]>([])
  const [activitiesG3, setActivitiesG3] = useState<Activities[]>([])
  const [imagesArrayBuffersG1, setImagesArrayBuffersG1] = useState<
    ArrayBuffer[]
  >([])
  const [imagesArrayBuffersG2, setImagesArrayBuffersG2] = useState<
    ArrayBuffer[]
  >([])
  const [imagesArrayBuffersG3, setImagesArrayBuffersG3] = useState<
    ArrayBuffer[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const authStore = useAuthStore()
  const userUID = authStore.user?.uid

  function disableWordButton() {
    if (loading) return true
    if (userUID == undefined) return true
    if (
      activitiesG1.length == 0 &&
      activitiesG2.length == 0 &&
      activitiesG3.length == 0
    )
      return true
  }

  function fetchG1() {
    onValue(ref(database, `activities/${userUID}/group-1`), (snapshot) => {
      console.log(userUID)
      if (snapshot.exists()) {
        const newActivities: Activities[] = []
        const imageUrls: string[] = []

        snapshot.forEach((snapshotItem) => {
          if (snapshotItem.key !== 'points') {
            const data = snapshotItem.val()
            newActivities.push(data)
          } else {
            const pointsData = snapshotItem.val().points
            setAllG1Points(pointsData)
          }
        })
        setActivitiesG1(newActivities)
        fetchG1ArrayBuffers(newActivities)
      }
    })
  }

  function fetchG2() {
    onValue(ref(database, `activities/${userUID}/group-2`), (snapshot) => {
      const newActivities: Activities[] = []
      snapshot.forEach((snapshotItem) => {
        if (snapshotItem.key !== 'points') {
          const data = snapshotItem.val()
          newActivities.push(data)
        } else {
          const pointsData = snapshotItem.val().points
          setAllG2Points(pointsData)
        }
      })
      setActivitiesG2(newActivities)
      fetchG2ArrayBuffers(newActivities)
    })
  }

  function fetchG3() {
    onValue(ref(database, `activities/${userUID}/group-3`), (snapshot) => {
      const newActivities: Activities[] = []
      snapshot.forEach((snapshotItem) => {
        if (snapshotItem.key !== 'points') {
          const data = snapshotItem.val()
          newActivities.push(data)
        } else {
          const pointsData = snapshotItem.val().points
          setAllG3Points(pointsData)
        }
      })
      setActivitiesG3(newActivities)
      fetchG3ArrayBuffers(newActivities)
    })
  }

  const fetchImagesAsArrayBuffers = async (urls: string[]) => {
    const buffers = []

    for (const url of urls) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Erro ao buscar a imagem: ${response.statusText}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        buffers.push(arrayBuffer)
      } catch (error) {
        console.error('Erro ao buscar ou converter a imagem:', error)
      }
    }
    return buffers
  }

  async function fetchG1ArrayBuffers(activities: Activities[]) {
    if (activities.length > 0) {
      const imageUrlsG1 = activities.map((item) => item.image)
      const buffers = await fetchImagesAsArrayBuffers(imageUrlsG1)
      setImagesArrayBuffersG1(buffers)
    }
  }

  async function fetchG2ArrayBuffers(activities: Activities[]) {
    if (activities.length > 0) {
      const imageUrlsG2 = activities.map((item) => item.image)
      const buffers = await fetchImagesAsArrayBuffers(imageUrlsG2)
      setImagesArrayBuffersG2(buffers)
    }
  }

  async function fetchG3ArrayBuffers(activities: Activities[]) {
    if (activities.length > 0) {
      const imageUrlsG3 = activities.map((item) => item.image)
      const buffers = await fetchImagesAsArrayBuffers(imageUrlsG3)
      setImagesArrayBuffersG3(buffers)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchG1()
    fetchG2()
    fetchG3()
    setLoading(false)
  }, [userUID])

  return (
    <div className="flex flex-row p-10 bg-primary h-[100vh] bg-opacity-10">
      <div className="w-full">
        <div className="flex flex-col gap-10">
          <div className="flex flex-row bg-white border rounded-md p-6 justify-between">
            <Progression
              type="1"
              points={allG1Points}
              progression="10"
              maxPoints="40"
            />
            <Progression
              type="2"
              points={allG2Points}
              progression="10"
              maxPoints="30"
            />
            <Progression
              type="3"
              points={allG3Points}
              progression="10"
              maxPoints="40"
            />
          </div>
          <div className="bg-white border rounded-md p-6">
            <div className="flex flex-row justify-between items-center mb-4">
              <p className="font-bold text-lg">Atividades cadastradas</p>
              <div className="flex flex-row gap-4 items-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setOpenNewActivity(true)}
                >
                  <FiPlus /> Nova atividade
                </button>
                <CreateEditActivityModal
                  open={openNewActivity}
                  onClose={() => setOpenNewActivity(false)}
                />
                <button
                  className="btn btn-primary btn-sm"
                  disabled={disableWordButton()}
                  onClick={() =>
                    generateFromUrl(
                      activitiesG1,
                      activitiesG2,
                      activitiesG3,
                      imagesArrayBuffersG1,
                      imagesArrayBuffersG2,
                      imagesArrayBuffersG3,
                      allG1Points.toString(),
                      allG2Points.toString(),
                      allG3Points.toString(),
                      authStore.user
                    )
                  }
                >
                  <FaFileExport /> Exportar para Word
                </button>
              </div>
            </div>
            <hr />
            <ActivitiesCollapse
              activities={activitiesG1}
              title="Grupo 1"
              fetchActivities={fetchG1}
            />
            <ActivitiesCollapse
              activities={activitiesG2}
              title="Grupo 2"
              fetchActivities={fetchG2}
            />
            <ActivitiesCollapse
              activities={activitiesG3}
              title="Grupo 3"
              fetchActivities={fetchG3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface IActivitiesCollapse {
  title: string
  activities: Activities[]
  fetchActivities: (userUID: string) => void
}

function ActivitiesCollapse({
  activities,
  title,
  fetchActivities,
}: IActivitiesCollapse) {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  return (
    <div className="collapse">
      <input type="checkbox" onChange={() => setCollapsed(!collapsed)} />
      <div className="collapse-title pr-0">
        <p className="text-base font-medium flex flex-row items-center justify-between">
          {title}
          {collapsed ? (
            <IoIosArrowDown size={18} />
          ) : (
            <IoIosArrowUp size={18} />
          )}
        </p>
      </div>
      <div className="collapse-content px-8">
        <ActivityTable
          activities={activities}
          fetchActivities={fetchActivities}
        />
      </div>
    </div>
  )
}
