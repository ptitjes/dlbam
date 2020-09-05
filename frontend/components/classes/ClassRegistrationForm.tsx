import React from "react"
import styled from "styled-components"

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

  @media (min-width: ${breakpoints.small}px) {
    & > .full-row {
      grid-column-end: span 2;
    }
  }

  @media (max-width: ${breakpoints.extraSmall - 1}px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

const ClassRegistrationForm: React.FC = () => {
  const { slug, classes } = useClassTypeContext()

  return (
    <Form>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="firstname" />
        <label>Prénom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="lastname" />
        <label>Nom</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="phone" />
        <label>Numéro de téléphone</label>
      </div>
      <div className="mui-textfield mui-textfield--float-label">
        <input type="text" name="email" />
        <label>Courriel</label>
      </div>
      <div className="full-row">
        <h3>Selectionnez les cours souhaités :</h3>
        {classes.map(({ id, title }) => (
          <div key={id} className="mui-checkbox">
            <label>
              <input type="checkbox" name={`${slug}-${id.toString()}`} />
              {title}
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
          <input type="radio" name="membership-dlbam" />
          J'adhére à l'association (5€)
        </label>
      </div>
      <div className="mui-radio">
        <label>
          <input type="radio" name="membership-dlbam-done" />
          Je suis déjà adhérent.e de l'association
        </label>
      </div>
      <button type="submit" className="mui-btn mui-btn--primary full-row">
        Je m'inscris !
      </button>
    </Form>
  )
}

export default ClassRegistrationForm
