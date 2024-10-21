import { useEffect, useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa6";
import CreateActivityModal from './CreateActivityModal';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { database, auth } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { IoIosArrowDown, IoIosArrowUp} from 'react-icons/io';
import Progression from './components/Progression';
import ActivityTable from './components/ActivitiesTable';
import { useNavigate } from 'react-router-dom';

export interface Activities {
  name: string,
  group: string,
  points: number,
  image: string,
  id: string
}

export default function Home() {
  const [openNewActivity, setOpenNewActivity] = useState<boolean>(false)
  const [allG1Points, setAllG1Points] = useState<number>(0)
  const [allG2Points, setAllG2Points] = useState<number>(0)
  const [allG3Points, setAllG3Points] = useState<number>(0)
  const [activitiesG1, setActivitiesG1] = useState<Activities[]>([])
  const [activitiesG2, setActivitiesG2] = useState<Activities[]>([])
  const [activitiesG3, setActivitiesG3] = useState<Activities[]>([])
  const navigate = useNavigate()

  function signOUT(){
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
  };

  function fetchG1(userId: string) {
    onValue(ref(database, `activities/${userId}/group-1`), (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshotItem => {
          if (snapshotItem.key != "points") {
            const data = snapshotItem.val();
            setActivitiesG1([...activitiesG1, data])
          } else {
            const pointsData = snapshotItem.val().points
            setAllG1Points(pointsData)
          }
        })
      }
    });
  }

  function fetchG2(userId: string) {
    onValue(ref(database, `activities/${userId}/group-2`), (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshotItem => {
          if (snapshotItem.key != "points") {

            const data = snapshotItem.val();
            setActivitiesG2([...activitiesG2, data])
          } else {
            const pointsData = snapshotItem.val().points
            setAllG2Points(pointsData)
          }
        })
      }
    })
  }

  function fetchG3(userId: string) {
    onValue(ref(database, `activities/${userId}/group-3`), (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshotItem => {
          if (snapshotItem.key != "points") {
            const data = snapshotItem.val();
            setActivitiesG3([...activitiesG1, data])
          } else {
            const pointsData = snapshotItem.val().points
            setAllG3Points(pointsData)
          }
        })
      }
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchG1(user.uid)
        fetchG2(user.uid)
        fetchG3(user.uid)
      }
    });
  }, [])

  return (
    <div className="flex flex-row p-10 bg-primary h-[100vh] bg-opacity-10">
      <div className="w-full">
        <div className='flex flex-col gap-10'>
          <div className='flex flex-row bg-white border rounded-md p-6 justify-between'>
            <Progression type='1' points={allG1Points} progression='10' maxPoints='40' />
            <Progression type='2' points={allG2Points} progression='10' maxPoints='30' />
            <Progression type='3' points={allG3Points} progression='10' maxPoints='40' />
          </div>
          <div className='bg-white border rounded-md p-6'>
            <div className='flex flex-row justify-between items-center mb-4'>
              <p className='font-bold text-lg'>Atividades cadastradas</p>
              <div className='flex flex-row gap-4 items-center'>
                <button
                  className='btn btn-primary btn-sm'
                  onClick={() => setOpenNewActivity(true)}
                >
                  <FiPlus /> Nova atividade
                </button>
                <CreateActivityModal open={openNewActivity} onClose={() => setOpenNewActivity(false)} />
                <button className='btn btn-primary btn-sm'>
                  <FaFileExport /> Exportar para Word
                </button>
              </div>
            </div>
            <hr />
            <ActivitiesCollapse activities={activitiesG1} title='Grupo 1' />
            <ActivitiesCollapse activities={activitiesG2} title='Grupo 2' />
            <ActivitiesCollapse activities={activitiesG3} title='Grupo 3' />
          </div>
        </div>
      </div>
    </div>
  );
}

interface IActivitiesCollapse {
  title: string
  activities: Activities[]
}

function ActivitiesCollapse({ activities, title }: IActivitiesCollapse) {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  return (
    <div className="collapse">
      <input type="checkbox" onChange={() => setCollapsed(!collapsed)} />
      <div className="collapse-title pr-0">
        <p className='text-base font-medium flex flex-row items-center justify-between'>
          {title}
          {collapsed ? (
            <IoIosArrowDown size={18} />
          ) : (
            <IoIosArrowUp size={18} />
          )}
        </p>
      </div>
      <div className="collapse-content px-8">
        <ActivityTable activities={activities} />
      </div>
    </div>
  )
}