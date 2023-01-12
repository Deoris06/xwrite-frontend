import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import useAuthContext from '../context/AuthContext';
const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
   const { register, errors } = useAuthContext()
    const handleRegister = async (event) => {
        event.preventDefault()
        register({name, email, password, password_confirmation})
        // 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
    }
  return (
    <section className="bg-white py-2 lg:py-[120px]">
    <div className="container mx-auto">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div
            className="
              relative
              mx-auto
              max-w-[525px]
              overflow-hidden
              rounded-lg
              bg-white
              py-16
              px-10
              text-center
              sm:px-12
              md:px-[60px]
            "
          >
            <div className="mb-10 text-center md:mb-16">Xwriter</div>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                />
                { errors.name && (
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">{errors.name[0]}</span>
                </div>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                />
                { errors.email && (
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">{errors.email[0]}</span>
                </div>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                />
               { errors.password && (
                <div className="flex">
                  <span className="text-red-400 text-sm m-2 p-2">{errors.password[0]}</span>
                </div>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  value={password_confirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  placeholder="Password Confirmation"
                  className="
                    bordder-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                />
                
              </div>
              <div className="mb-10">
                <button
                  type="submit"
                  className="
                    w-full
                    px-4
                    py-3
                    bg-indigo-500
                    hover:bg-indigo-700
                    rounded-md
                    text-white
                  "
                >
                  Sign Up
                </button>
              </div>
            </form>
            
            <p className="text-base text-[#adadad]">
              a member?
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Register