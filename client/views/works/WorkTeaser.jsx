import injectTapEventPlugin from 'react-tap-event-plugin';
import { Card } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Work Teaser
WorkTeaser = React.createClass({

	propTypes: {
		work: React.PropTypes.object.isRequired,
	},

	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			isInShelf: false,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	getMeteorData() {
		let isInShelf = false;


		const worksShelfList = Meteor.users.findOne({}, { fields: { worksShelf: 1 } });
		if (worksShelfList && 'worksShelf' in worksShelfList) {
			// Check if current textNode exist in bookmarked textNodes
			isInShelf = ~worksShelfList.worksShelf.indexOf(this.props.work._id._str);
		}

		return {
			isInShelf,
		};
	},

	toggleShelf(isChecked) {
		if (Meteor.userId()) {
			if (!isChecked) {
				Meteor.call('shelf.insert', this.props.work._id._str);
			} else {
				Meteor.call('shelf.remove', this.props.work._id._str);
			}
			this.setState({
				isInShelf: true,
			});
		} else {
			this.setState({
				showLoginDialog: true,
			});
		}
	},

	render() {
		const work = this.props.work;
		const workUrl = `/works/${work._id._str}/${work.slug}`;

		let isInShelf = this.data.isInShelf;

		if (this.state.isInShelf) {
			isInShelf = this.state.isInShelf;
		}

		return (
			<Card
				className="work-teaser"
			>

				<div className="card-meta-left">
					<IconButton
						tooltip="Add to Your Library"
						tooltipPosition="top-center"
						className={`icon-favorite-button ${isInShelf ? 'in-user-shelf' : ''}`}
						iconClassName="mdi mdi-book-open-variant"
						onClick={this.toggleShelf.bind(this, isInShelf)}
					/>

					<div className="card-meta-items">
						{work.workLanguage ?
							<span className="card-meta card-meta-left-language">
								{Utils.capitalize(work.workLanguage)}
							</span>
						: ''
						}
						{work.date ?
							<span className="card-meta card-meta-left-date">
								{work.date}
							</span>
						:
							''
						}
					</div>
				</div>

				<div className="work-teaser-authors">
					{work.authors.map((author, i) => (
						<a
							key={i}
							href={`/authors/${author.slug}`}
							className="work-teaser-author"
						>
							<h4>
								{author.english_name}
								{author.original_name ?
									<span className="work-teaser-author-original-name">
										({author.original_name})
									</span>
									:
									''
								}
							</h4>
						</a>
					))}
				</div>

				<a
					href={workUrl}
					className="work-teaser-title"
				>
					<h3 >
						{work.english_title}
						{work.original_title ?
							<span className="work-teaser-original-title">
								{work.original_title}
							</span>
							:
							''
						}
					</h3>
				</a>

				<div className="card-meta-bottom">
					<span className="card-meta meta-count-commentary">
						{work.countComments} Comments
					</span>
					<span className="card-meta meta-count-translations">
						{work.countTranslations} Translations
					</span>
					<span className="card-meta meta-count-annotations">
						{work.countAnnotations} Annotations
					</span>

				</div>


				{/* <Divider />
				<CardActions>
				<a href="#">
				<IconButton tooltip="Comment">
				<CommunicationComment />
				</IconButton>
				</a>
				<a href="#">
				<IconButton tooltip="Favorite">
				<ActionFavoriteBorder />
				</IconButton>
				</a>
				<a href="#">
				<IconButton tooltip="Other Formats">
				<ActionInput />
				</IconButton>
				</a>
				</CardActions>*/}
			</Card>
		);
	},

});

WorkTeaser.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
