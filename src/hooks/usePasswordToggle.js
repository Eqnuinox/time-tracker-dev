import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export const usePasswordToggle = () => {
	const [visible, setVisible] = useState(false)

	const Icon = (
		<FontAwesomeIcon
			icon={visible ? faEyeSlash : faEye}
			onClick={() => setVisible((visible) => !visible)}
		/>
	)

	const InputType = visible ? 'text' : 'password'

	return [InputType, Icon]
}

