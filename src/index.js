import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import DefaultLabel from '@sanity/base/lib/__legacy/@sanity/components/labels/DefaultLabel'

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
    {value >= item ? <FaStar /> : <FaRegStar />}
  </label>
)

const RatingInput = ({ type, value, onChange }) => {
  const { title, description, options } = type
  const end = options && options.stars ? parseFloat(options.stars) : 5
  const stars = makeIterable(end)

  const handleChange = evt => {
    const val = evt.target.value
    onChange(createPatchFrom(val))
  }

  return (
    <div>
      <DefaultLabel>{title}</DefaultLabel>
      {description && (
        <p style={{ marginTop: `0.25rem`, fontSize: `0.8125rem` }}>
          {description}
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
