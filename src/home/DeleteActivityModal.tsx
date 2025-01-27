import { IoMdClose } from "react-icons/io";
import { Activities } from "./Home";
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from "../firebase";
import { increment, ref, remove, update } from "firebase/database";
import { useAuthStore } from "../store/auth.store";

interface IDeleteActivityModal {
  open: boolean;
  onClose: () => void;
  activity: Activities;
  fetchActivities: (userId: string) => void;
}
export default function DeleteActivityModal({
  open,
  onClose,
  activity,
  fetchActivities,
}: IDeleteActivityModal) {

  const authStore = useAuthStore()

  function deleteActivity() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        remove(
          ref(
            database,
            `activities/${user.uid}/${activity?.group}/${activity?.id}`
          )
        );
        update(ref(database, `activities/${user.uid}/${activity?.group}/points`), {
          points: increment(-activity?.points),
        })
        fetchActivities(user.uid);
        onClose();
      }
    });
  }
  return (
    <dialog className={`modal ${open && "modal-open"} animate-ping`}>
      <div className="modal-box p-8 max-w-fit grid gap-8">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold text-lg">Deseja excluir a atividade?</p>
          <button
            className="btn btn-ghost btn-circle btn-secondary btn-sm hover:bg-gray-200"
            onClick={onClose}
          >
            <IoMdClose size={16} />
          </button>
        </div>
        <p>Essa ação excluirá a atividade permanentemente</p>
        <div>
          <div className="flex flex-row justify-evenly gap-10">
            <button
              className="btn btn-sm disabled:bg-gray-200 btn-wide"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="btn btn-error btn-sm disabled:bg-gray-200 w-52"
              onClick={deleteActivity}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
