import React from 'react'
import PropTypes from 'prop-types'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import DefaultLabel from '@sanity/components/lib/labels/DefaultLabel'

import Star from './svg/star.svg'
import StarFilled from './svg/starFilled.svg'

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)))

const makeIterable = end => {
  const range = []

  for (let i = 0; i < end; i++) {
    range.push(i + 1)
  }

  return range
}

const RadioButton = ({ item, selected, value }) => (
  <label htmlFor={item} style={{ marginRight: `0.25rem` }}>
    <input
      type="radio"
      id={item}
      name="rating"
      value={item}
      style={{
        position: `absolute`,
        top: `-9999px`,
        width: `1px`,
        height: `1px`,
      }}
      selected={selected}
    />
    {value >= item ? <StarFilled /> : <Star />}
  </label>
)

const RatingInput = ({ type, value, onChange }) => {
  const end = type.options.stars || 5
  const stars = makeIterable(end)

  const handleChange = evt => {
    const val = evt.target.value
    onChange(createPatchFrom(val))
  }

  return (
    <div>
      <DefaultLabel>{type.title}</DefaultLabel>
      {type.description && (
        <p style={{ marginTop: `0.25rem`, fontSize: `0.8125rem` }}>
          {type.description}
        </p>
      )}
      <div onChange={handleChange}>
        {stars.map(item => (
          <RadioButton item={item} selected={value === item} value={value} />
        ))}
      </div>
    </div>
  )
}

export default RatingInput

RatingInput.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      stars: PropTypes.number,
    }).isRequired
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
