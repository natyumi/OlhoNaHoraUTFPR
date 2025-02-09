import { IoIosEyeOff, IoMdClose, IoMdEye } from 'react-icons/io'
import Input from '../components/Input'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth.store'
import { ref, update } from 'firebase/database'
import { database } from '../firebase'
import { getAuth, updateEmail, updatePassword } from 'firebase/auth'

export interface IEditProfileModal {
  open: boolean
  onClose: () => void
}
export function EditProfileModal({ open, onClose }: IEditProfileModal) {
  const authStore = useAuthStore()
  const user = getAuth().currentUser

  const [name, setName] = useState('')
  const [course, setCourse] = useState('')
  const [email, setEmail] = useState('')
  const [Ra, setRa] = useState(0)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (authStore.user) {
      setName(authStore.user.name ?? '')
      setCourse(authStore.user.course ?? '')
      setEmail(authStore.user.email ?? '')
      setRa(authStore.user.Ra ?? 0)
    }
  }, [open])

  function isButtonDisabled() {
    return (
      !name ||
      !course ||
      !email ||
      !Ra ||
      (name === authStore.user?.name &&
        course === authStore.user?.course &&
        email === authStore.user?.email &&
        Ra === authStore.user?.Ra &&
        password === '')
    )
  }

  async function updateProfile() {
    if (!authStore.user) return

    try {
      const updates: Record<string, any> = {}
      if (name !== authStore.user.name) updates.name = name
      if (course !== authStore.user.course) updates.course = course
      if (email !== authStore.user.email) updates.email = email
      if (Ra !== authStore.user.Ra) updates.Ra = Ra

      if (Object.keys(updates).length > 0) {
        await update(ref(database, `users/${authStore.user.uid}`), updates)
        console.log('Perfil atualizado com sucesso!')
      }

      if (password && user) {
        await updatePassword(user, password)
        console.log('Senha atualizada com sucesso!')
      }

      if (email !== authStore.user.email && user) {
        await updateEmail(user, email)
        console.log('E-mail atualizado com sucesso!')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
    } finally {
      onClose()
      resetInputs()
    }
  }

  function resetInputs() {
    setName(authStore.user?.name ?? '')
    setCourse(authStore.user?.course ?? '')
    setEmail(authStore.user?.email ?? '')
    setRa(authStore.user?.Ra ?? 0)
    setPassword('')
  }
  return (
    <dialog className={`modal ${open && 'modal-open'} animate-ping`}>
      <div className="modal-box p-8 grid gap-8">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-lg">Editar perfil</p>
          <button
            className="btn btn-ghost btn-circle btn-secondary btn-sm hover:bg-gray-200"
            onClick={() => {
              onClose()
              resetInputs()
            }}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            title="Nome completo"
            placeholder="Insira seu nome"
            onChange={(e) => setName(e.target.value)}
            inputSize="input-sm"
            value={name}
          />

          <div className="flex flex-col">
            <p className="text-sm mb-2 font-medium">Curso</p>
            <select
              className="select select-bordered select-sm w-full border-gray-200"
              onChange={(e) => setCourse(e.target.value)}
              value={course}
            >
              <option disabled selected>
                Selecione seu curso
              </option>
              <option value={'Engenharia de computação'}>
                Engenharia de computação
              </option>
              <option value={'Engenharia de software'}>
                Engenharia de software
              </option>
            </select>
          </div>

          <Input
            title="Email"
            placeholder="Insira seu email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputSize="input-sm"
            value={email}
          />

          <div className="flex flex-col">
            <p className="text-sm font-medium mb-2"> Nova senha</p>
            <div className="border flex flex-row items-center justify-between rounded-lg border-gray-200 px-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Insira sua nova senha"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-xs w-full border-none"
              />
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff size={18} />
                ) : (
                  <IoMdEye size={18} />
                )}
              </button>
            </div>
          </div>

          <Input
            title="Código do aluno (R.A)"
            placeholder="Insira seu R.A"
            onChange={(e) => setRa(e.target.value)}
            type="number"
            inputSize="input-sm"
            value={Ra}
          />
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="btn btn-sm btn-primary disabled:bg-gray-200 disabled:text-gray-400"
            disabled={isButtonDisabled()}
            onClick={updateProfile}
          >
            Editar perfil
          </button>
        </div>
      </div>
    </dialog>
  )
}
