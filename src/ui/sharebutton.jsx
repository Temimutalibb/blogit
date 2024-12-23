import PropTypes from "prop-types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
window.global = window;

const ShareButton = ({ url, text }) => {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <div>
      <Helmet>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </Helmet>
      <a
        href="https://twitter.com/share"
        className="twitter-share-button"
        data-url={url}
        data-text={text}
      >
        Tweet
      </a>
    </div>
  );
};
ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default ShareButton;
