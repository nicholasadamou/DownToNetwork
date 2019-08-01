/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'

import { Form, TextInput, Button } from 'carbon-components-react'

import * as ROUTES from '../../constants/routes'

import Context from '../../contexts/Context'

import './index.scss'

const Wrapper = styled.div` 
    width: 100%;
    height: 100%;

    padding: 10px;

	overflow: hidden;

	div {
		margin-top: 10px;

		&:first-child {
			margin-top: 0;
		}
	}

	form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 50%;

        overflow: hidden;

        @media (max-width: 375px) {
            top: initial;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);

            width: 90%;
        }

        h1 {
            font-size: larger;
            font-weight: bold;
            margin-bottom: 20px;
        }

		button {
			max-width: 100%;
			width: 100%;
		}
	}
`

const ForgotPasswordPage = props => {
	const { account, setAccount, validateEmail, handlePasswordReset, error } = useContext(Context)

	const isValid = validateEmail(account.email)

	return (
		<Layout>
			<Wrapper>
				<Form onSubmit={handlePasswordReset}>
                    <h1>Reset your Password</h1>
					{
						error && (
							<span className="error-message">
								<span role="img" aria-label="warning">⚠️</span>
								{error.message}
							</span>
						)
					}
					<TextInput
						id="email"
						labelText="Email *"
						placeholder="Stephen.Alt@ibm.com"
						className="signin__btn"
						onBlur={e => setAccount('email', e)}
					/>
					<Button kind="primary" type="submit" disabled={!isValid}>Reset Password</Button>
					<Button 
						kind="secondary"
						style={{ marginTop: 10 }} 
						onClick={() => {
							window.location.href = `${ROUTES.LANDING}`
						}}
					>
					Back
					</Button>
				</Form>
			</Wrapper>
		</Layout>
	)
}

export default ForgotPasswordPage
