
import React, { Component } from 'react'

import styled from 'styled-components'

import { Form, Button } from 'carbon-components-react'

import { withFirebase } from '../../../contexts/Firebase'

import AccountContext from '../../../contexts/Account/AccountContext'

import MultiSelect from '../../../components/MultiSelect/MultiSelect'

const Wrapper = styled.div`
    margin-bottom: 10px;
`

class ChangeMatchSettingsForm extends Component {
    static contextType = AccountContext

    constructor(props) {
        super(props)

        this.state = { 
            error: null,
            errorMessage: ''
        }
    }

    render() {
        const { errorMessage } = this.state
        const { handleChangeMatchSettings, setMatchSettings, matchSettings } = this.context

        const isValid = matchSettings.length !== 0

        return (
            <Wrapper>
                <h1>Change Match Settings</h1>
                <Form onSubmit={handleChangeMatchSettings}>
                    <MultiSelect
                        id="match-settings"
                        titleText="Who do you want to meet?"
                        label="Select all that apply"
                        handleOnChange={e => {
                            this.setState({
                                error: false
                            })

                            setMatchSettings(e.selectedItems)
                        }}
                    />
                    
                    {this.state.error || this.context.error ? (
                        <div style={{ lineHeight: 2, marginBottom: 20 }}>
                            <span role="img" aria-label="warning">⚠️</span>  
                            {(errorMessage && errorMessage) || (this.context.error.message && this.context.error.message)}
                        </div>
                    ) : (
                        ''
                    )}

                    <Button kind="primary" disabled={!isValid} type="submit">
                        Change My Match Settings
                    </Button>
                </Form>
            </Wrapper>
        )
    }
}

export default withFirebase(ChangeMatchSettingsForm)