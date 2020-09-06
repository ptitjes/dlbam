import axios from "axios"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styled from "styled-components"

import { EXTERNAL_API_URL } from "../../lib/strapi"
import { breakpoints } from "../theme"
import { useClassTypeContext } from "./class-type-context"

const Form = styled.form`
  border: dotted 3px ${(props) => props.theme.colors.o2};
  border-radius: 8px;
  padding: 16px;

  margin: 24px 0;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  column-gap: 16px;

  & > .mui-radio + .mui-radio,
  & > .mui-checkbox + .mui-checkbox {
    margin-top: 10px;
  }

  .invalid {
    color: red;
  }

  @media (min-width: ${breakpoints.small}px) {
    & > .full-row {
      grid-column-end: span 2;
    }
  }

  @media (max-width: ${breakpoints.extraSmall - 1}px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

const RegistrationResult = styled.div`
  border: dotted 3px ${(props) => props.theme.colors.o2};
  border-radius: 8px;
  padding: 16px;

  margin: 24px 0;
`

function firstLineOfDescription(description: string) {
  const firstLine = description.split("\n")[0]
  const normalizedFirstLine = firstLine.replace(/\*/g, "")
  return normalizedFirstLine.slice(0, 1).toLocaleLowerCase() + normalizedFirstLine.slice(1)
}

const phoneRegex = /^(?:(?:\+|00)[\s.-]*33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

interface RegistrationData {
  firstname: string
  lastname: string
  phone: string
  email: string
  classType: string
  classes: string[]
  membership: "new" | "already"
  acknowledgedCodeOfConduit: true
  acknowledgedCGV: true
}

enum RegistrationState {
  Pending,
  Done,
  Error,
}

const ClassRegistrationForm: React.FC = () => {
  const { id, classes } = useClassTypeContext()
  const [registrationState, setRegistrationState] = useState<RegistrationState>(RegistrationState.Pending)
  const { register, handleSubmit, errors } = useForm<RegistrationData>()

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    const { classType, classes: registeredClasses } = data
    const dataToSend = {
      ...data,
      classType: parseInt(classType),
      classes: registeredClasses.includes("all") ? classes.map((c) => c.id) : registeredClasses.map((c) => parseInt(c)),
    }

    const response = await axios.post(`${EXTERNAL_API_URL}/class-registrations`, dataToSend)
    if (response.status === 200) {
      setRegistrationState(RegistrationState.Done)
    } else {
      console.log("Registration error !!!")
      console.log(response)
      setRegistrationState(RegistrationState.Error)
    }
  }

  if (registrationState === RegistrationState.Pending) {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mui-textfield mui-textfield--float-label">
          <input type="text" name="firstname" ref={register({ required: true })} required />
          <label>Prénom</label>
        </div>
        <div className="mui-textfield mui-textfield--float-label">
          <input type="text" name="lastname" ref={register({ required: true })} required />
          <label>Nom</label>
        </div>
        <div className="mui-textfield mui-textfield--float-label">
          <input type="tel" name="phone" ref={register({ required: true, pattern: phoneRegex })} required />
          <label>Numéro de téléphone</label>
        </div>
        <div className="mui-textfield mui-textfield--float-label">
          <input type="email" name="email" ref={register({ required: true, pattern: emailRegex })} required />
          <label>Courriel</label>
        </div>

        <input type="hidden" name="classType" value={id} ref={register({ required: true })} />

        <div className="full-row">
          <h3>Selectionnez les cours souhaités :</h3>
          {errors.classes && <span className="invalid">Selectionnez au moins une session !</span>}
          <div className="mui-checkbox">
            <label>
              <input type="checkbox" name="classes" value="all" ref={register({ required: true })} />
              Toutes les sessions, du 9 sep. au 23 juin (34 x 1h30), 250€
            </label>
          </div>

          {classes.map(({ id, title, description, price }) => (
            <div key={id} className="mui-checkbox">
              <label>
                <input type="checkbox" name="classes" value={id} ref={register({ required: true })} />
                {title}, {firstLineOfDescription(description)}, {price}€
              </label>
            </div>
          ))}
        </div>

        <div className="full-row">
          <h3>Adhésion à Mars Blues Dancers :</h3>
          <p>Pour suivre les cours, vous devez être adhérent.e à l'association Mars Blues Dancers.</p>
        </div>
        <div className="mui-radio">
          <label>
            <input type="radio" name="membership" value="new" defaultChecked ref={register({ required: true })} />
            J'adhére à l'association (5€).
          </label>
        </div>
        <div className="mui-radio">
          <label>
            <input type="radio" name="membership" value="already" ref={register({ required: true })} />
            Je suis déjà adhérent.e.
          </label>
        </div>

        <div className="full-row">
          <h3>Charte et conditions générales de vente :</h3>
          <div className="mui-checkbox">
            <label>
              <input type="checkbox" name="acknowledgedCodeOfConduit" ref={register({ required: true })} required />
              J'ai pris connaissance et souscrit à la <a href="/about/code-of-conduit">charte</a>.
            </label>
          </div>
          <div className="mui-checkbox">
            <label>
              <input type="checkbox" name="acknowledgedCGV" ref={register({ required: true })} required />
              J'ai lu les <a href="/misc/cgv">conditions générales de vente</a>.
            </label>
          </div>
        </div>

        <button type="submit" className="mui-btn mui-btn--primary full-row">
          Je m'inscris !
        </button>
      </Form>
    )
  } else if (registrationState === RegistrationState.Error) {
    return (
      <RegistrationResult>
        <p className="invalid">Une erreur s'est produite lors de votre inscription !</p>
        <p>
          Veuillez, s'il-vous-plaît, contactez les administrateurs:{" "}
          <a href="mailto:contact@dlbam.org">contact@dlbam.org</a>.
        </p>
      </RegistrationResult>
    )
  } else {
    return (
      <RegistrationResult>
        <p>Votre inscription a bien été enregistrée !</p>
        <button
          type="button"
          className="mui-btn mui-btn--primary full-row"
          onClick={() => setRegistrationState(RegistrationState.Pending)}
        >
          Effectuer une autre inscription
        </button>
      </RegistrationResult>
    )
  }
}

export default ClassRegistrationForm
