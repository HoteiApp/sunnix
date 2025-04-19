import { useState } from "react";
import { Disclosure, RadioGroup } from "@headlessui/react";

import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPaintBrush,
  faUserShield,
  faBell,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { TwoFactor } from "../../commons/TwoFactor";
import { ConfigSideTabs } from "./ConfigSideTabs";
import { ActiveUser } from "../../../models";


const color = {
  colors: [
    {
      name: "Azul",
      class: "bg-blue-900",
      selectedClass: "active ring-blue-900",
    },
    { name: "Verde", class: "bg-green-400", selectedClass: "ring-green-400" },
  ],
  colorbg: [
    {
      name: "blanco",
      class: "bg-white",
      selectedClass: "active ring-gray-400",
    },
    { name: "gris", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    {
      name: "gris oscuro",
      class: "bg-gray-400",
      selectedClass: "ring-gray-400",
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProfileConfig = ({ activeUser }: Props) => {
  const [selectedColor, setSelectedColor] = useState(color.colors[0]);
  const [selectedColorBg, setSelectedColorBg] = useState(color.colorbg[0]);

  return (
    <>
      <ConfigSideTabs />
      <div className="w-3/4 p-5 flex flex-col ">
        <Disclosure
          as="div"
          key="public"
          className="w-full border-b border-gray-200 py-2"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex w-full justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
                <span className="flex text-base font-semibold leading-7 text-gray-900 hover:text-gray-500">
                  <h2 className="text-sm text-gray-900">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />{" "}
                    Informaci&oacute;n visible de su perfil p&uacute;blico
                  </h2>
                  {/* <FontAwesomeIcon icon={faUser} className="text-gray-900"/>  */}
                </span>

                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel>
                <form>
                  <div className="mt-2 space-y-5 border-t border-gray-200">
                    <p className="flex flex-col text-sm">
                      Te pedimos que rellenes todos los campos requeridos.
                      Recuerda que tu perfil público será la primera impresión
                      que otros usuarios tendrán de ti, así que asegúrate de que
                      sea completo y representativo de quién eres.
                    </p>
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Username
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                workcation.com/
                              </span>
                              <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="janesmith"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="about"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            About
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="about"
                              name="about"
                              rows={3}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
                          </div>
                          <p className="mt-3 text-sm leading-6 text-gray-600">
                            Write a few sentences about yourself.
                          </p>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Photo
                          </label>
                          <div className="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon
                              className="h-12 w-12 text-gray-300"
                              aria-hidden="true"
                            />
                            <button
                              type="button"
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                              Change
                            </button>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cover photo
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <PhotoIcon
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            First name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Last name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option>United States</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="region"
                              id="region"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              name="postal-code"
                              id="postal-code"
                              autoComplete="postal-code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Notifications
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but
                        you pick what else you want to hear about.
                      </p>

                      <div className="mt-10 space-y-10">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            By Email
                          </legend>
                          <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="comments"
                                  name="comments"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="comments"
                                  className="font-medium text-gray-900"
                                >
                                  Comments
                                </label>
                                <p className="text-gray-500">
                                  Get notified when someones posts a comment on
                                  a posting.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="candidates"
                                  name="candidates"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="candidates"
                                  className="font-medium text-gray-900"
                                >
                                  Candidates
                                </label>
                                <p className="text-gray-500">
                                  Get notified when a candidate applies for a
                                  job.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="offers"
                                  name="offers"
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="offers"
                                  className="font-medium text-gray-900"
                                >
                                  Offers
                                </label>
                                <p className="text-gray-500">
                                  Get notified when a candidate accepts or
                                  rejects an offer.
                                </p>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Push Notifications
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            These are delivered via SMS to your mobile phone.
                          </p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-everything"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Everything
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Same as email
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="push-nothing"
                                name="push-notifications"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-nothing"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                No push notifications
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure
          as="div"
          key="appearance"
          className="w-full border-b border-gray-200 py-2"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex w-full justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
                <span className="flex text-base font-semibold leading-7 text-gray-900 hover:text-gray-500">
                  <h2 className="text-sm text-gray-900">
                    <FontAwesomeIcon
                      icon={faPaintBrush}
                      className="text-gray-400"
                    />{" "}
                    Apariencia
                  </h2>
                  {/* <FontAwesomeIcon icon={faUser} className="text-gray-900"/>  */}
                </span>

                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel>
                <form>
                  <div className="mt-2 space-y-5 border-t border-gray-200">
                    <p className="flex flex-col  text-sm">
                      Seleccione un solo tema o sincronice con su sistema y
                      cambie automáticamente entre temas diurnos y nocturnos.
                    </p>
                    <div className="flex w-full">
                      <div className="grid flex flex-col flex-grow">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Modo del tema
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Seleccione como desea ver AGA.
                          </p>
                          <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                              <input
                                checked
                                id="light"
                                name="theme_mode"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-everything"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Claro
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="dack"
                                name="theme_mode"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-everything"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Oscuro
                              </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                              <input
                                id="system"
                                name="theme_mode"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <label
                                htmlFor="push-email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Sincronizado con el sistema
                              </label>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                      <div className="divider divider-horizontal"></div>
                      <div className="grid flex flex-col flex-grow">
                        <div>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Color de fondo
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Seleccione como desea ver el fondo de la
                            palicaci&oacute;n.
                          </p>

                          <RadioGroup
                            value={selectedColorBg}
                            onChange={setSelectedColorBg}
                            className="mt-4"
                          >
                            <RadioGroup.Label className="sr-only">
                              Seleccione el color
                            </RadioGroup.Label>
                            <span className="flex items-center space-x-3">
                              {color.colorbg.map((color) => (
                                <RadioGroup.Option
                                  key={color.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked
                                        ? "ring ring-offset-1"
                                        : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {color.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color.class,
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                              ))}
                            </span>
                          </RadioGroup>
                        </div>
                        <div>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Color barra superior
                          </legend>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Seleccione como desea ver la barra superior.
                          </p>

                          <RadioGroup
                            value={selectedColor}
                            onChange={setSelectedColor}
                            className="mt-4"
                          >
                            <RadioGroup.Label className="sr-only">
                              Seleccione el color
                            </RadioGroup.Label>
                            <span className="flex items-center space-x-3">
                              {color.colors.map((color) => (
                                <RadioGroup.Option
                                  key={color.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked
                                        ? "ring ring-offset-1"
                                        : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {color.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color.class,
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                              ))}
                            </span>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure
          as="div"
          key="notify"
          className="w-full border-b border-gray-200 py-2"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex w-full justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
                <span className="flex text-base font-semibold leading-7 text-gray-900 hover:text-gray-500">
                  <h2 className="text-sm text-gray-900">
                    <FontAwesomeIcon icon={faBell} className="text-gray-400" />{" "}
                    Notificaciones
                  </h2>
                  {/* <FontAwesomeIcon icon={faUser} className="text-gray-900"/>  */}
                </span>

                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel>
                <form>
                  <div className="mt-2 space-y-5 border-t border-gray-200">
                    <p className="flex flex-col text-sm">
                      La configuración de notificaciones es una herramienta útil
                      para garantizar que el usuario reciba solo la información
                      relevante para su trabajo y para ayudar a evitar la
                      distracción innecesaria durante el trabajo.
                    </p>
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-2 space-y-10">
                        <fieldset>
                          <legend className="text-sm font-semibold leading-6 text-gray-900">
                            Por correo electrónico
                          </legend>
                          <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="mail_login"
                                  name="mail_login"
                                  type="checkbox"
                                  className="toggle toggle-primary rounded-xl"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="comments"
                                  className="font-medium text-gray-900"
                                >
                                  Acceso
                                </label>
                                <p className="text-gray-500">
                                  Notificar cuando se acceda a su cuenta en el
                                  sistema. De esta manera, podrá estar al tanto
                                  de quién está accediendo a su información y
                                  tomar medidas adecuadas en caso de que alguien
                                  esté accediendo sin su autorización.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="mail_change"
                                  name="mail_change"
                                  type="checkbox"
                                  className="toggle toggle-primary rounded-xl"
                                />
                              </div>

                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="candidates"
                                  className="font-medium text-gray-900"
                                >
                                  Actividad sospechosa
                                </label>
                                <p className="text-gray-500">
                                  Para mantenerlo informado de cualquier cambio
                                  importante que se realice, se le alertará en
                                  caso de que se produzcan modificaciones en los
                                  datos de su cuenta. De esta manera, podrá
                                  estar al tanto de cualquier actividad
                                  sospechosa y tomar medidas adecuadas para
                                  proteger su información personal.
                                </p>
                              </div>
                            </div>
                            <div className="relative flex gap-x-3">
                              <div className="flex h-6 items-center">
                                <input
                                  id="mail_expiration"
                                  name="mail_expiration"
                                  type="checkbox"
                                  checked
                                  className="toggle toggle-primary rounded-xl"
                                />
                              </div>
                              <div className="text-sm leading-6">
                                <label
                                  htmlFor="mail_expiration"
                                  className="font-medium text-gray-900"
                                >
                                  Caducidad de la contraseña
                                </label>
                                <p className="text-gray-500">
                                  Se le informará cuando su contraseña esté por
                                  vencer. Recibirá alertas con 10, 5 y 1 día de
                                  anticipación, lo que le permitirá actualizar
                                  su contraseña de manera oportuna y evitar
                                  cualquier posible riesgo de seguridad.
                                </p>
                              </div>
                            </div>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="submit"
                        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure
          as="div"
          key="password"
          className="w-full border-b border-gray-200 py-2"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full flex w-full justify-between bg-white py-2 text-sm text-gray-400 hover:text-gray-500">
                <span className="flex text-base font-semibold leading-7 text-gray-900 hover:text-gray-500">
                  <h2 className="text-sm text-gray-900">
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="text-gray-400"
                    />{" "}
                    Seguridad y autenticación
                  </h2>
                  {/* <FontAwesomeIcon icon={faUser} className="text-gray-900"/>  */}
                </span>

                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel>
                <form>
                  <div className="mt-2 space-y-5 border-t border-gray-200">
                    <div className="pt-5 flex flex-col w-full border-opacity-50">
                      <div className="grid card rounded-box p-5 border border-gray-200">
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Autenticación de dos factores
                        </legend>
                        <p className="flex flex-col text-sm">
                          La autenticación de dos factores agrega una capa
                          adicional de seguridad a su cuenta al requerir más que
                          solo una contraseña para iniciar sesión.
                          <fieldset>
                            <legend className="pt-2 text-sm font-semibold leading-6 text-gray-900">
                              Métodos de dos factores
                            </legend>
                            <div className="mt-2 space-y-6">
                              <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                  <FontAwesomeIcon
                                    icon={faMobile}
                                    className="text-gray-400"
                                  />{" "}
                                </div>
                                <div className="text-sm leading-6">
                                  <label
                                    htmlFor="authenticator_app"
                                    className="font-medium text-gray-900"
                                  >
                                    <div className="flex w-full">
                                      <div className="grid  card  rounded-box md:w-2/4">
                                        Aplicación de autenticación {"  "}
                                        <p className="text-gray-500 text-xs text-justify">
                                          Use una aplicación de autenticación o
                                          una extensión del navegador para
                                          obtener códigos de autenticación de
                                          dos factores cuando se le solicite.
                                          <br />
                                          Al habilitar esta opción, evitará
                                          cambiar su contraseña cada 90 días
                                          según las políticas de seguridad
                                          informática. Sin embargo, esto aumenta
                                          el riesgo de seguridad. Elija una
                                          contraseña segura y no comparta su
                                          información. La opción no exime de
                                          otras medidas de seguridad, como la
                                          detección de actividad sospechosa en
                                          su cuenta. Si necesita ayuda, póngase
                                          en contacto con nuestro equipo de
                                          soporte.
                                        </p>
                                      </div>
                                      <div className="divider divider-horizontal"></div>
                                      <div className="grid card rounded-box md:w-2/4">
                                        <div className="collapse">
                                          <input
                                            type="checkbox"
                                            className="peer"
                                          />
                                          <div className="collapse-title">
                                            {activeUser?.User?.security_code ? (
                                              <button className="btn btn-outline btn-error">
                                                Deshabilitar
                                              </button>
                                            ) : (
                                              <button className="btn btn-outline btn-success">
                                                Habilitar
                                              </button>
                                            )}
                                          </div>
                                          <div className="collapse-content">
                                            {activeUser?.User?.security_code ? (
                                              <p className="text-gray-500 text-xs text-justify">
                                                Entendemos que ha decidido
                                                desactivar la autenticación de
                                                dos factores en su cuenta. Por
                                                favor tenga en cuenta que
                                                deshabilitar esta función
                                                aumenta el riesgo de acceso no
                                                autorizado a su cuenta.
                                                <br />
                                                Puede volver a habilitar la
                                                autenticación de dos factores en
                                                cualquier momento si cambia de
                                                opinión en el futuro.
                                              </p>
                                            ) : (
                                              <>
                                                <p className="text-gray-500 text-xs text-justify">
                                                  Escanne el Qr
                                                </p>
                                                <div className="pt-10">
                                                  {/* <img
                                                    src={activeUser?.fa.qr}
                                                    alt={""}
                                                    className="md:-mt-10 md:z-10 bg-white"
                                                  /> */}
                                                </div>
                                              </>
                                            )}
                                            <TwoFactor />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

type Props = {
  activeUser?: ActiveUser;
};
export { ProfileConfig };
