import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Note } from "@prisma/client";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";

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
    try {
      const response = await api.post<Note>(
        "/api/notes",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      reset();
      closeModal();
      await queryClient.prefetchQuery({ queryKey: ["notes"] });
      //alert("Nota adicionada com sucesso!");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <nav className="bg-[#24292f] text-white fixed top-0 w-full h-16 flex flex-row justify-around items-center p-4 shadow-md">
      <div className="flex justify-start items-center gap-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>

        <p className="hidden sm:flex text-sm sm:text-2xl font-semibold">
          Minhas notas
        </p>
      </div>

      <button
        className="w-full flex flex-row items-center justify-center gap-2 rounded-md bg-[#2da44e] hover:bg-[#308d4a] active:bg-[#2a6b3c] text-white font-semibold p-2 px-8"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p> Nova nota</p>
      </button>

      <div className="hidden lg:flex w-full lg:justify-end">
        <button className=" hover:text-[#308d4a] active:text-[#2a6b3c]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </button>
      </div>

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
