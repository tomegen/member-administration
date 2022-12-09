//import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createMember, deleteMember, getMembers, patchMember } from '../api/members-api'
import Auth from '../auth/Auth'
import { Member } from '../types/Member'

interface MembersProps {
  auth: Auth
  history: History
}

interface MembersState {
  members: Member[]
  newMemberFirstName: string
  loadingMembers: boolean
}

export class Members extends React.PureComponent<MembersProps, MembersState> {
  state: MembersState = {
   members: [],
    newMemberFirstName: '',
    loadingMembers: true
  }

  handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newMemberFirstName: event.target.value })
  }

  onEditButtonClick = (memberId: string, member: Member) => {
    this.props.history.push(`/members/${memberId}/update`)
  }

  onUploadButtonClick = (memberId: string) => {
    this.props.history.push(`/members/${memberId}/upload`)
  }

  onMemberCreate = () => {
    this.props.history.push(`/members/create`)
  }

  onMemberDelete = async (memberId: string) => {
    try {
      await deleteMember(this.props.auth.getIdToken(), memberId)
      this.setState({
        members: this.state.members.filter(member => member.memberId !== memberId)
      })
    } catch {
      alert('Member deletion failed')
    }
  }


  async componentDidMount() {
    try {
      const members = await getMembers(this.props.auth.getIdToken())
      this.setState({
        members,
        loadingMembers: false
      })
    } catch (e) {
      alert(`Failed to fetch members: ${(e as Error).message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">MEMBERs</Header>

        {this.renderCreateMemberInput()}

        {this.renderMembers()}
      </div>
    )
  }

  renderCreateMemberInput() {
    return (
      <Grid.Row>
        <Grid.Column width={1} floated="right">
          <Button
            icon
            color="green"
            onClick={() => this.onMemberCreate()}
          >
            <Icon name="plus" />
          </Button>
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderMembers() {
    if (this.state.loadingMembers) {
      return this.renderLoading()
    }

    return this.renderMembersList()
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

  renderMembersList() {
    return (
      <Grid padded>
        {this.state.members.map((member, pos) => {
          return (
            <Grid.Row key={member.memberId}>
              <Grid.Column width={3} verticalAlign="middle">
                <Grid.Row>
                  {member.gender}                
                </Grid.Row>
                <Grid.Row>
                  {member.firstName}                
                </Grid.Row>
                <Grid.Row>
                  {member.lastName}                
                </Grid.Row>
                <Grid.Row>
                  {member.birthday}                
                </Grid.Row>
                <Grid.Row>
                  {member.memberSince}                
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                <Grid.Row>
                  {member.postCode}                
                </Grid.Row>
                <Grid.Row>
                  {member.city}                
                </Grid.Row>
                <Grid.Row>
                  {member.street}                
                </Grid.Row>
                <Grid.Row>
                  {member.description}                
                </Grid.Row>
                <Grid.Row>
                  {member.referenceId}                
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle">
              <Grid.Row>
                  {member.phoneNumber}                
                </Grid.Row>
                <Grid.Row>
                  {member.handyNumber}                
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={4} floated="right">

                {member.attachmentUrl && (
                  <Image src={member.attachmentUrl} size="small" wrapped />
                )}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(member.memberId, this.state.members[pos])}
                >
                  <Icon name="pencil" />
                </Button>
                <Button
                  icon
                  color="green"
                  onClick={() => this.onUploadButtonClick(member.memberId)}
                >
                  <Icon name="upload" />
                </Button>
                <Button
                  icon
                  color="red"
                  onClick={() => this.onMemberDelete(member.memberId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

}
