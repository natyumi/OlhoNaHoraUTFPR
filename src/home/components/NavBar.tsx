import { FaHome } from 'react-icons/fa'
import logo2 from '../../assets/Logo2.svg'
import { IoIosSchool } from 'react-icons/io'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useAuthStore } from '../../store/auth.store'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useState } from 'react'
import { EditProfileModal } from '../EditProfileModal'

export default function NavBar() {
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false)
  const navigate = useNavigate()
  const authStore = useAuthStore()
  function signOUT() {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="navbar bg-primary px-10 flex flex-row justify-between">
      <img src={logo2} width={200} height={200} alt="Picture of the author" />
      <div className="flex flex-row gap-10">
        <button className="btn btn-ghost hover:underline btn-md p-0 text-base">
          <FaHome /> Início
        </button>
        <button className="btn btn-ghost hover:underline btn-md p-0 text-base">
          <a
            href="https://lookerstudio.google.com/u/0/reporting/60006be7-dcda-4cdb-a68a-155524657d3e/page/9CdfD?s=idGX-_rm6H4"
            target="_blank"
            className='flex flex-row items-center gap-2'
          >
            <IoIosSchool /> Projetos
          </a>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-secondary btn-lg font-medium"
          >
            <span>{authStore.user?.name.slice(0, 1).toLocaleUpperCase()}</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg mt-1"
          >
            <li>
              <p className="font-medium text-base">{authStore.user?.name}</p>
            </li>
            <hr />
            <li className="mt-2 hover:bg-primary hover:bg-opacity-20 hover:rounded-md">
              <a onClick={() => setOpenEditProfile(true)}>Editar perfil</a>
            </li>
            <li className="mt-2 hover:bg-primary hover:bg-opacity-20 hover:rounded-md text-error">
              <a onClick={signOUT}>
                {' '}
                <RiLogoutBoxLine className="text-error" size={18} />
                Sair
              </a>
            </li>
          </ul>
        </div>
      </div>
      <EditProfileModal
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
      />
    </div>
  )
}
