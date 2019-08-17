/* eslint-disable no-unused-vars */
import React, { Component } from 'react'

import { compose } from 'recompose'

import Swipeable from "react-swipy";

import styled from 'styled-components'

import { withAuthorization, withEmailVerification } from '../../contexts/Session'
import AccountContext from '../../contexts/Account/AccountContext';

import Layout from '../../components/Layout/Layout'
import MenuBar from '../../components/MenuBar'
import Loading from '../../components/Loading'

import './index.scss'

const CardsWrapper = styled.div`
	width: 100%;
	height: 100%;

	overflow: hidden;

	> div {
		display: flex;
		align-items: center;
	}
`

const NoCardsWrapper = styled.div`
	width: 100%;
	height: 100%;

	> div {
		display: flex;
		align-items: flex-start;
		flex-direction: column;

		padding: 10px;
		padding-left: 20px;

		h1 {
			margin-bottom: 10px;

			font-size: large;
			font-weight: bold;
		}

		p {
			line-height: 2;
		}
	}
`

const Card = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	width: 90%;
	height: auto;

	margin: 0 auto;

	user-select: none;
	cursor: pointer;

	background-color: white;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const UserWrapper = styled.div`
	position: relative;

	img {
		display: block;

		width: 100%;
	}
`

const TextWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;

	padding: 10px;

	background-color: white;
	color: #171717;

	h1 {
		font-size: x-large;
		font-weight: bold;
	}

	p {
		font-size: medium;
		font-style: italic;
	}
`

class DashboardPage extends Component {
	static contextType = AccountContext

	constructor (props) {
		super(props)

		this.state = {
			matches: [],
			loading: true,
		}

		this.remove = this.remove.bind(this)
	}

	remove = () =>
		this.setState(({ matches }) => ({ matches: matches.slice(1, matches.length) }));

	componentWillMount () {
		const { firebase } = this.props
		const { user } = this.context
		console.log('user=', user)

		// Get list of all users
		firebase.users().then(response => {
			// Filter current user out of users
			const users = response.filter(user => user.id !== this.context.user.uid)
			console.log('users=', users)

			// TODO: Filter previously matched users out of users

			// Get list of users whose role matches the
			// currently authenticated user's list of
			// networking preferences
			this.setState({
				matches: response,
				loading: false,
				// matches: firebase.getUsersByMatchSettings(users, user.matchSettings)
			}, () => console.log('matches=', this.state.matches))
		}).catch(error => {
			this.setState({
				error: {
					error: true,
					message: error.message
				},
				loading: false
			}, () => console.log('error=', this.state.error))
		})
	}

	render () {
		const { matches, loading } = this.state

		return (
			<Layout>
				{
					loading ? (
						<Loading />
					) : (
						<>
							{matches.length > 0 && (
								<CardsWrapper>
									<Swipeable
										onAfterSwipe={this.remove}
									>
										<Card>
											<UserWrapper>
												<img src={matches[0].profilePicture} alt="" />
												<TextWrapper>
													<h1>{matches[0].name}</h1>
													<p>{matches[0].role}</p>
												</TextWrapper>
											</UserWrapper>
										</Card>
									</Swipeable>
									{matches.length > 1 && <Card style={{ zIndex: -1 }}>{matches[1].name}</Card>}
								</CardsWrapper>
							)}
							{matches.length === 0 && (
								<NoCardsWrapper>
									<Card style={{ zIndex: -2, height: '100%', width: '100%' }}>
										<h1>No more potential matches. <span role="img" aria-label="crying face">😢</span></h1>
										<p>Please refresh the page or change your match preferences to get match'n again.</p>
									</Card>
								</NoCardsWrapper>
							)}
						</>
					)
				}
				<MenuBar />
			</Layout>
		)
	}
}

export default compose(
	withEmailVerification,
	withAuthorization(authUser => !!authUser)
)(DashboardPage)
