import React from 'react'

const validators = {
  name: val => val.length > 3,
  bio: _ => true,
  age: val => Number(val) >= 18
}

class UserForm extends React.Component {
  state = {
    data: {
      name: '',
      bio: '',
      age: 1
    },
    errors: {
      name: true,
      age: true
    },
    touch: {
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const user = {
      ...this.state.data
    }

    this.props.onAddUser(user)

    this.setState({
      data: {
        name: '',
        bio: '',
        age: 1
      },
      errors: {
        name: true,
        age: true
      },
      touch: {
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target

    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const valid = validators[name](value)

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: !valid
      }
    })
  }

  render() {
    const { errors, data, touch } = this.state
    const anyError = Object.values(errors).some(x => x)

    return (
      <div className="UserForm">
        <form onSubmit={this.handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              className={`form-control ${errors.name && touch.name ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              autoComplete="off"
              value={data.name}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Name" />

            {touch.name && errors.name && (
              <div className="invalid-feedback">
                Must be > 3
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="bio">Bio</label>

            <textarea
              className="form-control"
              id="bio"
              name="bio"
              autoComplete="off"
              value={data.bio}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Bio"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age">Age</label>

            <select
              className={`form-control ${touch.age && errors.age ? 'is-invalid' : ''}`}
              id="age"
              name="age"
              value={data.age}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              placeholder="Bio"
            >
              {new Array(100).fill().map((_, i) => (
                <option key={i} value={i+1}>{i+1}</option>
              ))}
            </select>

            {touch.age && errors.age && (
              <div className="invalid-feedback">
                Must be > 18
              </div>
            )}
          </div>

          <button disabled={anyError} type="submit" className="btn btn-primary">
            Add
          </button>
        </form>

        <pre className="bg-light p-2">
          {JSON.stringify(this.state, null, "  ")}
        </pre>
      </div>
    )
  }
}

export default UserForm
