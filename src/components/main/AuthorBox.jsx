import React, {Component} from 'react'
import AuthorImage from './AuthorImage'
import AuthorInfo from './AuthorInfo'
import './AuthorBox.css'

export default class AuthorBox extends Component {
  render() {
    const { author, allImages } = this.props
    return (
      <div className="thumbnail">
        <h3 className="hide-sm">{author}</h3>
        <AuthorImage author={author} allImages={allImages} showUnknown={true} />
        <AuthorInfo author={author} />
      </div>
    )
  }
}
