import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Note } from "@prisma/client";
import { useForm } from "react-hook-form";

function NavBar() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Note>();

  async function onFormSubmit(data: Note) {
    console.log(data);
    reset();
    //alert(data)
    closeModal();
  }

  return (
    <nav className="fixed top-0 w-full h-16 flex flex-row justify-between items-center bg-white p-4 shadow-md gap-x-4">
      <p className="text-sm text-center lg:text-2xl font-semibold text-gray-800">
        Minhas notas
      </p>
      <button
        className="border border-gray-400 rounded-lg bg-gray-200 text-gray-700 p-2 px-4 w-[400px] text-left drop-shadow-md cursor-text"
        onClick={openModal}
      >
        Criar uma nota...
      </button>
      <div className="hidden lg:flex">Sobre</div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white px-6 py-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between items-center text-lg font-medium leading-6 text-gray-900"
                  >
                    <p>Nova nota</p>

                    <button type="button" onClick={closeModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 hover:text-[red] hover:bg-slate-100 hover:rounded-full "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="flex flex-col justify-center items-center w-full pt-6 text-primary gap-1"
                  >
                    <input
                      type="text"
                      id="title"
                      placeholder="Título"
                      className={`w-full border rounded-md p-2 drop-shadow-md`}
                      {...register("title", { required: true })}
                    />
                    <span className="text-[red] text-sm w-full pt-1">
                      {errors.title?.type === "required" &&
                        "Campo obrigatório!"}
                    </span>

                    <textarea
                      id="content"
                      placeholder="Criar uma nota..."
                      className="w-full border rounded-md p-2 mt-4 drop-shadow-md"
                      rows={8}
                      {...register("content", { required: true })}
                    />
                    <span className="text-[red] text-sm w-full pt-1">
                      {errors.content?.type === "required" &&
                        "Campo obrigatório!"}
                    </span>
                    <div className="w-full flex justify-end items-center ">
                      <button
                        type="submit"
                        className=" hover:text-[blue]/80 font-semibold py-2 px-3 active:text-[blue]/50  "
                      >
                        <span className="drop-shadow-lg">Salvar</span>
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}

export default NavBar;
