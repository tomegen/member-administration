import * as React from 'react'
import { Button, Grid, Form } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { createMember } from '../api/members-api'
import { History } from 'history'



interface CreateMemberProps {
  auth: Auth
  history: History
}

interface CreateMemberState {
  description: string, 
  gender: string,
  firstName: string, 
  lastName: string, 
  birthday: string, 
  postCode: string, 
  city: string,
  street: string, 
  phoneNumber: string,
  handyNumber: string, 
  email: string, 
  memberSince: string, 
  referenceId: string, 

  createMemberState: boolean
}

export class CreateMember extends React.PureComponent<
  CreateMemberProps,
  CreateMemberState
> {
  state: CreateMemberState = {
    description: "", 
    gender: "m",
    firstName: "", 
    lastName: "", 
    birthday: "", 
    postCode: "", 
    city: "",
    street: "", 
    phoneNumber: "",
    handyNumber: "", 
    email: "", 
    memberSince: "", 
    referenceId: "",

    createMemberState: false
  }

  //to implement
  handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      gender: event.target.value
    })
  }

  handleBirthday = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      birthday: event.target.value
    })
  }

  handleMemberSince = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      memberSince: event.target.value
    })
  }

  handleCancel = async (event: React.SyntheticEvent) => {
      this.setState({
        createMemberState: true
      })
  }

  handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: event.target.value
    })
  }

  handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      phoneNumber: event.target.value
    })
  }

  handleHandyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      handyNumber: event.target.value
    })
  }

  handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value
    })
  }

  handleReferenceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      referenceId: event.target.value
    })
  }

  handlePostCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      postCode: event.target.value
    })
  }

  handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      city: event.target.value
    })
  }

  handleStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      street: event.target.value
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    if(!this.state.gender || !this.state.firstName || !this.state.lastName 
      || !this.state.birthday || !this.state.memberSince) {

        console.log(this.state.firstName)
        alert('Member Creation failed, because mandatory fields are empty')
        return
    }

    try {

      this.setState({
        createMemberState: true
      })
      await createMember(this.props.auth.getIdToken(), {
        firstName: this.state.firstName,
        gender: this.state.gender,
        lastName: this.state.lastName, 
        birthday: this.state.birthday,
        memberSince: this.state.memberSince,
        description: this.state.description,
        postCode: this.state.postCode, 
        city: this.state.city, 
        street: this.state.street,
        phoneNumber: this.state.phoneNumber, 
        handyNumber: this.state.handyNumber, 
        email: this.state.email, 
        referenceId: this.state.referenceId
      
      })
      
      alert('Member was created!')
      this.props.history.push(`/`)

    } catch {
      alert('Member creation failed')
    } finally {
      this.setState({
        createMemberState: false
      })
    
    }

  }

  render() {
    return (
      <div>
        <h1>Create new member</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Gender: </label>
            <input
              type="text"
              onChange={this.handleGender}
              defaultValue={this.state.gender}
            />
            <label>First Name: </label>
            <input
              type="text"
              onChange={this.handleFirstName}
              defaultValue={this.state.firstName}
            />
            <label>Last Name: </label>
            <input
              type="text"
              onChange={this.handleLastName}
              defaultValue={this.state.lastName}
            />
            <label>Birthday: </label>
            <input
              type="text"
              onChange={this.handleBirthday}
              defaultValue={this.state.birthday}
            />
            <label>Member Since: </label>
            <input
              type="text"
              onChange={this.handleMemberSince}
              defaultValue={this.state.memberSince}
            />
            <label>ReferenceId: </label>
            <input
              type="text"
              onChange={this.handleReferenceId}
              defaultValue={this.state.referenceId}
            />
            <label>Description: </label>
            <input
              type="text"
              onChange={this.handleDescription}
              defaultValue={this.state.description}
            />
            <label>Phone Number: </label>
            <input
              type="text"
              onChange={this.handlePhoneNumber}
              defaultValue={this.state.phoneNumber}
            />
            <label>Handy Number: </label>
            <input
              type="text"
              onChange={this.handleHandyNumber}
              defaultValue={this.state.handyNumber}
            />
            <label>Email: </label>
            <input
              type="text"
              onChange={this.handleEmail}
              defaultValue={this.state.email}
            />
            <label>Post Code: </label>
            <input
              type="text"
              onChange={this.handlePostCode}
              defaultValue={this.state.postCode}
            />
            <label>City: </label>
            <input
              type="text"
              onChange={this.handleCity}
              defaultValue={this.state.city}
            />
            <label>Street: </label>
            <input
              type="text"
              onChange={this.handleStreet}
              defaultValue={this.state.street}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }


  renderButton() {

    return (
      <div>
        {this.state.createMemberState === true && <p>New member in creation</p>}
        <Grid.Row>
          <Grid.Column width={1} floated="right">
            <Button
              loading={this.state.createMemberState !== false}
              onClick={this.handleSubmit}
              type="submit"
            >
              Create the member
            </Button>
          </Grid.Column>
        
        </Grid.Row>
      </div>

    )
  }

}
