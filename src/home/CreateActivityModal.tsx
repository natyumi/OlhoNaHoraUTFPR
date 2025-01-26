import { IoMdClose } from 'react-icons/io'
import Input from '../components/Input'
import { useRef, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { child, push, update, ref as refDB, increment } from 'firebase/database'
import { database, storage, auth } from '../firebase'
import { FaRegFileImage } from 'react-icons/fa'
import { onAuthStateChanged } from 'firebase/auth'

interface ICreateActivityModal {
  open: boolean
  onClose: () => void
}
export default function CreateActivityModal({
  open,
  onClose,
}: ICreateActivityModal) {
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
    start == '' ||
    end == '' ||
    duration == ''
  const fileInputRef = useRef(null)

  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const files = event.target.files
    if (!files) return

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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newActivityKey = push(
          child(refDB(database), `activities/${user.uid}/${group}`)
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
          id: newActivityKey,
        }
        update(
          refDB(database, `activities/${user.uid}/${group}/${newActivityKey}`),
          newActivity
        )
          .then(() => {
            console.log('sucesso')
          })
          .catch((error) => {
            console.log(error)
          })
        update(refDB(database, `activities/${user.uid}/${group}/points`), {
          points: increment(parseInt(points)),
        })
          .then(() => {
            console.log('sucesso')
          })
          .catch((error) => {
            console.log(error)
          })
        onClose()
      }
    })
  }

  return (
    <dialog className={`modal ${open && 'modal-open'} animate-ping`}>
      <div className="modal-box p-8 w-full grid gap-8">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-lg">Nova atividade</p>
          <button
            className="btn btn-ghost btn-circle btn-secondary btn-sm hover:bg-gray-200"
            onClick={onClose}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            title="Nome da atividade"
            placeholder="Insira o nome da atividade"
            onChange={(e) => setName(e.target.value)}
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
            ></textarea>
          </div>
          <div className="flex flex-row gap-4">
            <Input
              title="Início"
              placeholder="Ex.: 14/08/2021"
              onChange={(e) => setStart(e.target.value)}
              required
            />
            <Input
              title="Término"
              placeholder="Ex.: 15/08/2021"
              onChange={(e) => setEnd(e.target.value)}
              required
            />
            <Input
              title="Duração"
              placeholder="Ex.: 12 horas"
              onChange={(e) => setDuration(e.target.value)}
              required
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
                  <option disabled selected>
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
            />
          </div>

          <div>
            <p className="text-sm font-medium text-secondary mb-2">
              Arquivo comprobatório (png) <span className="text-error">*</span>
            </p>
            <div className="flex flex-row gap-2 w-full items-center">
              <input
                type="file"
                className="hidden"
                onChange={uploadImage}
                ref={fileInputRef}
                accept="image/png"
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
            onClick={createActivity}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </dialog>
  )
}
