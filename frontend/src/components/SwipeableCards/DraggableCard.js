import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Hammer from 'hammerjs'

import SimpleCard from './DraggableCard'

import { translate3d } from '../../lib/utils'

class DraggableCard extends Component {
  constructor (props) {
		super(props)

    this.state = {
      x: 0,
      y: 0,
      initialPosition: { x: 0, y: 0 },
      startPosition: { x: 0, y: 0 },
      animation: null,
      pristine: true,
      dragging: false,
		}

		this.resetPosition = this.resetPosition.bind(this)
		this.panstart = this.panstart.bind(this)
		this.panend = this.panend.bind(this)
		this.panmove = this.panmove.bind(this)
		this.pancancel = this.pancancel.bind(this)
		this.handlePan = this.handlePan.bind(this)
		this.handleSwipe = this.handleSwipe.bind(this)
		this.calculatePosition = this.calculatePosition.bind(this)
		this.setCardClassName = this.setCardClassName.bind(this)
  }

  resetPosition = () => {
    const { x, y } = this.props.containerSize
    const card = ReactDOM.findDOMNode(this)

    const initialPosition = {
      x: Math.round((x - card.offsetWidth) / 2),
      y: Math.round((y - card.offsetHeight) / 2)
    }

    this.setState(state => ({
      ...state,
      x: initialPosition.x,
      y: initialPosition.y,
      initialPosition: initialPosition,
      startPosition: { x: 0, y: 0 },
      dragging: false,
    }))
  }

  panstart = () => {
	const { x, y } = this.state

    this.setState(state => ({
      ...state,
      animation: false,
      startPosition: { x, y },
      pristine: false,
      dragging: true,
    }))
  }

  panend = () => {
    const screen = this.props.containerSize
    const card = ReactDOM.findDOMNode(this)

    const getDirection = () => {
      switch (true) {
        case (this.state.x < -50): return 'Left'
        case (this.state.x + (card.offsetWidth - 50) > screen.x): return 'Right'
        case (this.state.y < -50): return 'Top'
        case (this.state.y + (card.offsetHeight - 50) > screen.y): return 'Bottom'
        default: return false
      }
		}

    const direction = getDirection()

    if (this.props[`onSwipe${direction}`]) {
      this.props[`onSwipe${direction}`]()
      this.props[`onOutScreen${direction}`](this.props.index)
    } else {
      this.resetPosition()
      this.setState(state => ({...state, animation: true }))
    }
  }

  panmove = e => {
    this.setState(this.calculatePosition( e.xDelta, e.yDelta ))
  }

  pancancel = e => {
    console.log(e.type)
  }

  handlePan = e => {
		e.preventDefault()

		this[e.type](e)

    return false
  }

  handleSwipe = e => {
    console.log(e.type)
  }

  calculatePosition = (xDelta, yDelta) => {
		const { initialPosition : { x, y } } = this.state

    return {
      x: (x + xDelta),
      y: (y + yDelta)
    }
	}

  componentDidMount () {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this))
    this.hammer.add(new Hammer.Pan({ threshold: 2 }))

    this.hammer.on('panstart panend pancancel panmove', this.handlePan)
    this.hammer.on('swipestart swipeend swipecancel swipemove', this.handleSwipe)

    this.resetPosition()
    window.addEventListener('resize', this.resetPosition)
  }

  componentWillUnmount () {
    if (this.hammer) {
      this.hammer.stop()
      this.hammer.destroy()
      this.hammer = null
		}

    window.removeEventListener('resize', this.resetPosition)
  }

  setCardClassName = (animation, dragging) => {
    return `${animation ? 'animate' : ''} ${dragging ? 'dragging' : ''}`
  }

  render () {
    const { props, setCardClassName, state } = this
    const { x, y, animation, dragging } = state
    const style = translate3d(x, y)

    return <SimpleCard {...props} style={style} className={setCardClassName(animation, dragging)} />
  }
}

export default DraggableCard
