import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

const ProjectCard = ({ project }) =>
  project.featured && (
    <div className="card no-decoration h-100">
      <img
        className="cover"
        src={`https://api.amfoss.in/${project.cover}`}
        alt={project.slug + `'s image`}
      />
      <div className="text-dark px-4 py-4">
        <Link href={'projects/' + project.slug}>
          <a>
            <h6 className="mb-2">{project.name}</h6>
          </a>
        </Link>
        <div>{project.tagline}</div>
      </div>
    </div>
  );

ProjectCard.propTypes = {
  project: PropTypes.any,
};

ProjectCard.defaultProps = {
  project: null,
};

export default ProjectCard;
