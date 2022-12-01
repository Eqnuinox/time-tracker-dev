import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import classes from './Sidebar.module.css'

const Sidebar = () => {
	return (
		<div className={classes.sidebar}>
			<Button.Group vertical className={classes.sidebar}>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
				<Button>
					<Link to={'/admin/user-controller'}>UserControl</Link>
				</Button>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
				<Button>
					<Link to={'/admin'}>Home</Link>
				</Button>
			</Button.Group>
		</div>
	)
}

export default Sidebar
