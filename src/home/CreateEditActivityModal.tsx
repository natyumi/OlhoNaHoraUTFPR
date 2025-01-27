import { IoMdClose } from 'react-icons/io'
import Input from '../components/Input'
import { useEffect, useRef, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { child, push, update, ref as refDB, increment } from 'firebase/database'
import { database, storage } from '../firebase'
import { FaRegFileImage } from 'react-icons/fa'
import { useAuthStore } from '../store/auth.store'
import { Activities } from './Home'

interface ICreateEditActivityModal {
  open: boolean
  onClose: () => void
  activity?: Activities
  editActivityBoolean?: boolean
}

export default function CreateEditActivityModal({
  open,
  onClose,
  activity,
  editActivityBoolean = false,
}: ICreateEditActivityModal) {
  const [name, setName] = useState<string>('')
  const [group, setGroup] = useState<string>('')
  const [points, setPoints] = useState<string>('')
  const [imgURL, setImgURL] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [start, setStart] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [duration, setDuration] = useState<string>('')
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false)
  const buttonDisabled =
    loadingUpload ||
    name == '' ||
    group == '' ||
    points == '' ||
    description == '' ||
    imgURL == ''
  const fileInputRef = useRef(null)
  const authStore = useAuthStore()
  const userUID = authStore.user?.id

  function clearInputs() {
    setName('')
    setGroup('')
    setPoints('')
    setDescription('')
    setStart('')
    setEnd('')
    setDuration('')
    setImgURL('')
    setImgName('')
  }

  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    // event.preventDefault()

    const files = event.target.files
    console.log(files)
    if (files == null || files.length <= 0) return

    setImgName(files[0].name)
    const storageRef = ref(storage, 'images/' + files[0].name)
    setLoadingUpload(true)
    const uploadTask = uploadBytesResumable(storageRef, files[0])

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL)
          setLoadingUpload(false)
        })
      }
    )
  }

  function createActivity() {
    const newActivityKey = push(
      child(refDB(database), `activities/${userUID}/${group}`)
    ).key
    const newActivity = {
      name: name,
      group: group,
      points: points,
      description: description,
      start: start,
      end: end,
      duration: duration,
      image: imgURL,
      imageName: imgName,
      id: newActivityKey,
    }
    update(
      refDB(database, `activities/${userUID}/${group}/${newActivityKey}`),
      newActivity
    )
      .then(() => {
        console.log('sucesso')
      })
      .catch((error) => {
        console.log(error)
      })
    update(refDB(database, `activities/${userUID}/${group}/points`), {
      points: increment(parseInt(points)),
    })
      .then(() => {
        console.log('sucesso')
      })
      .catch((error) => {
        console.log(error)
      })
    onClose()
    clearInputs()
  }

  function editActivity() {
    const editActivity = {
      name: name,
      group: group,
      points: points,
      description: description,
      start: start,
      end: end,
      duration: duration,
      image: imgURL,
      imageName: imgName,
    }
    update(
      refDB(database, `activities/${userUID}/${group}/${activity!.id}`),
      editActivity
    )
      .then(() => {
        console.log('sucesso')
      })
      .catch((error) => {
        console.log(error)
      })

    update(refDB(database, `activities/${userUID}/${activity?.group}/points`), {
      points: increment(-parseInt(activity!.points)),
    })

    update(refDB(database, `activities/${userUID}/${activity?.group}/points`), {
      points: increment(parseInt(points)),
    })

    onClose()
    clearInputs()
  }

  useEffect(() => {
    if (activity) {
      if (activity.name) setName(activity.name)
      if (activity.group) setGroup(activity.group)
      if (activity.points) setPoints(activity.points)
      if (activity.description) setDescription(activity.description)
      if (activity.start) setStart(activity.start)
      if (activity.end) setEnd(activity.end)
      if (activity.duration) setDuration(activity.duration)
      if (activity.image) setImgURL(activity.image)
      if (activity.imageName) setImgName(activity.imageName)
    }
  }, [activity])

  return (
    <dialog className={`modal ${open && 'modal-open'} animate-ping`}>
      <div className="modal-box p-8 w-full grid gap-8">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-lg">Nova atividade</p>
          <button
            className="btn btn-ghost btn-circle btn-secondary btn-sm hover:bg-gray-200"
            onClick={() => {
              onClose(); clearInputs()
            }}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            title="Nome da atividade"
            placeholder="Insira o nome da atividade"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <div>
            <p className="text-sm font-medium text-secondary mb-2">
              Descrição da atividade <span className="text-error">*</span>
            </p>
            <textarea
              className="textarea textarea-bordered w-full border-gray-200"
              placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="flex flex-row gap-4">
            <Input
              title="Início"
              placeholder="Ex.: 14/08/2021"
              onChange={(e) => setStart(e.target.value)}
              value={start}
            />
            <Input
              title="Término"
              placeholder="Ex.: 15/08/2021"
              onChange={(e) => setEnd(e.target.value)}
              value={end}
            />
            <Input
              title="Duração"
              placeholder="Ex.: 12 horas"
              onChange={(e) => setDuration(e.target.value)}
              value={duration}
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-10">
            <div className="w-full">
              <p className="text-sm font-medium text-secondary mb-2">
                Grupo <span className="text-error">*</span>
              </p>
              <div>
                <select
                  className="select select-sm w-full border border-gray-200 focus:border-gray-200"
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option disabled selected value={''}>
                    Escolha um grupo
                  </option>
                  <option value={'group-1'}>Grupo 1</option>
                  <option value={'group-2'}>Grupo 2</option>
                  <option value={'group-3'}>Grupo 3</option>
                </select>
              </div>
            </div>
            <Input
              title="Pontos"
              type="number"
              width="w-20"
              onChange={(e) => setPoints(e.target.value)}
              required
              value={points}
            />
          </div>

          <div>
            <p className="text-sm font-medium text-secondary mb-2">
              Arquivo comprobatório (png, jpg, jpeg){' '}
              <span className="text-error">*</span>
            </p>
            <div className="flex flex-row gap-2 w-full items-center">
              <input
                type="file"
                className="hidden"
                onChange={uploadImage}
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg"
              />
              <button
                className="btn btn-sm btn-circle bg-gray-300 border-none hover:bg-gray-300"
                onClick={() => {
                  //@ts-ignore
                  fileInputRef.current.click()
                }}
              >
                {loadingUpload ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FaRegFileImage className="text-secondary" />
                )}
              </button>
              <p className="text-xs font-medium">
                {imgName ? imgName : 'Nenhum arquivo selecionado'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="btn btn-primary btn-sm disabled:bg-gray-200"
            disabled={buttonDisabled}
            onClick={() => {
              if (activity && editActivityBoolean) {
                editActivity()
              } else {
                createActivity()
              }
            }}
          >
            {activity && editActivityBoolean ? 'Editar' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </dialog>
  )
}
