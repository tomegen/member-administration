import * as React from 'react'
import { Button, Grid, Form, Loader } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { patchMember, getMember } from '../api/members-api'
import { History } from 'history'
import { UpdateMemberRequest } from '../types/UpdateMemberRequest';



interface UpdateMemberProps {
  match: {
    params: {
      memberId: string
    }
  }
  auth: Auth
  history: History
}

interface UpdateMemberState {
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

  updateMemberState: boolean
  loadingMember: boolean
}

export class UpdateMember extends React.PureComponent<
  UpdateMemberProps,
  UpdateMemberState
> {
  state: UpdateMemberState = {

    description: "", 
    gender: "",
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

    loadingMember: true,
    updateMemberState: false
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
        updateMemberState: true
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
        alert('Member Update failed, because mandatory fields are empty')
        return
    }

    try {

      this.setState({
        updateMemberState: true
      })

      const member : UpdateMemberRequest = {
        firstName: this.state.firstName,
        gender: this.state.gender,
        lastName: this.state.lastName, 
        birthday: this.state.lastName,
        memberSince: this.state.memberSince,
        description: this.state.description,
        postCode: this.state.postCode, 
        city: this.state.city, 
        street: this.state.street,
        phoneNumber: this.state.phoneNumber, 
        handyNumber: this.state.handyNumber, 
        email: this.state.email, 
        referenceId: this.state.referenceId
      }

      await patchMember(this.props.auth.getIdToken(), this.props.match.params.memberId, member)
      
      alert('Member was updated!')
      this.props.history.push(`/`)


    } catch {
      alert('Member update failed')
    } finally {
      this.setState({
        updateMemberState: false
      })
    }
  }

  async componentDidMount() {
    try {
      const member = await getMember(this.props.auth.getIdToken(), this.props.match.params.memberId)
      this.setState({
        gender: member.gender, 
        firstName: member.firstName, 
        lastName: member.lastName,
        birthday: member.birthday, 
        memberSince: member.memberSince, 
        postCode: member.postCode,
        city: member.city,
        street: member.street,
        phoneNumber: member.phoneNumber, 
        handyNumber: member.handyNumber, 
        email: member.email, 
        referenceId: member.referenceId, 
        description: member.description,
      })

      this.setState({
        loadingMember: false
      })
    } catch (e) {
      alert(`Failed to fetch members: ${(e as Error).message}`)
    }
  }

  renderMember(){
      return (
        <div>
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
              <label>Reference Id: </label>
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
  

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading MEMBERs
        </Loader>
      </Grid.Row>
    )
  }

  render() {
    return (
      <div>
        <h1>Update member</h1>
        {this.renderMember()}
      </div>
    )
  }


  renderPage() {

    if (this.state.loadingMember) {
      return this.renderLoading()
    }
    else {
      return this.renderMember()
    }
  }

  renderButton() {

    return (
      <div>
        {this.state.updateMemberState === true && <p>Update of member in progress</p>}
        <Grid.Row>
          <Grid.Column width={1} floated="right">
            <Button
              loading={this.state.updateMemberState !== false}
              onClick={this.handleSubmit}
              type="submit"
            >
              Update the member
            </Button>
          </Grid.Column>
        
        </Grid.Row>
      </div>

    )
  }

}
