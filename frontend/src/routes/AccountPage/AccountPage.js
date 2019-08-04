import React from 'react'

import styled from 'styled-components'

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'

import ChangeProfilePictureForm from './components/ChangeProfilePictureForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import SignOutButton from './components/SignOutButton'
import CloseAccountButton from './components/CloseAccountButton'

import './index.scss'

const Wrapper = styled.div`
	padding: 20px;
	margin-bottom: 40px;

	width: 50%;

	overflow-x: hidden;

	@media (max-width: 375px) {
		width: 100%;

		padding: 10px;

		button {
			max-width: 100%;
		}
	}

	h1 {
		margin-bottom: 20px;

		font-size: larger;
		font-weight: bold;
	}
`

class AccountPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentWillMount() {}

	render() {
		return (
			<Layout>
				<Wrapper>
					<h1>Manage Your Profile</h1>
					<ChangeProfilePictureForm />
					<ChangePasswordForm />
					<SignOutButton />
					<CloseAccountButton />
				</Wrapper>
				<MenuBar />
			</Layout>
		)
	}
}

export default AccountPage
