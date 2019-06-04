(function() {
  "use strict";

  function initAjaxRequest(method, url) {
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open(method, url);
    xmlHttpRequest.resposeType = "json";
    return xmlHttpRequest;
  }

  function getAjaxResponse(ajaxRequest) {
    return new Promise((resolve, reject) => {
      ajaxRequest.onreadystatechange = () => {
        if (ajaxRequest.readyState === 4) {
          if (ajaxRequest.status === 200 && ajaxRequest.responseText !== "") {
            resolve(ajaxRequest.responseText);
          } else {
            reject(
              `Ajax error: ${ajaxRequest.status} : ${ajaxRequest.responseText}`
            );
          }
        }
      };
    });
  }

  const cssSupportButton = document.getElementById("css_support");
  const cssSupportForm = document.getElementById("css_support_form");
  const latestVersionsButton = document.getElementById("latest_versions");
  const cssBrowserName = document.getElementById("css_browser_name");

  latestVersionsButton.addEventListener("click", event => {
    const browser = document.getElementById("browser");
    const request = initAjaxRequest(
      "get",
      `/latest-versions?browser=${browser.value}`
    );
    request.send();
    getAjaxResponse(request).then(versions => {
      let latestVersionsContainer = document.getElementById(
        "latest_versions_container"
      );
      latestVersionsContainer.innerText = prettier.format(versions, {
        parser: "yaml",
        plugins: prettierPlugins
      });
    });
  });

  cssBrowserName.addEventListener("change", () => {
    const browser = document.getElementById("css_browser_name");
    const request = initAjaxRequest(
      "get",
      `/versions-for-browser?browser=${browser.value}`
    );
    request.send();
    getAjaxResponse(request).then(versions => {
      let cssBrowserVersions = document.getElementById("css_browser_version");
      let optionElement;
      let versionsArray = JSON.parse(versions);

      // crudely remove all existing `option` elements
      cssBrowserVersions.innerHTML = "";

      versionsArray.forEach(version => {
        optionElement = document.createElement("option");
        optionElement.setAttribute("value", version);
        optionElement.text = version;
        cssBrowserVersions.appendChild(optionElement);
      });
    });
  });

  cssSupportForm.addEventListener("submit", event => {
    event.preventDefault();
    let formData = new FormData(cssSupportForm);
    let queryStringArray = [];

    for (let entry of formData.entries()) {
      queryStringArray.push(`${entry[0]}=${entry[1]}`);
    }

    const request = initAjaxRequest(
      "get",
      "/is-css-supported?" + queryStringArray.join("&")
    );
    request.send();
    getAjaxResponse(request).then(supported => {
      let cssSupportContainer = document.getElementById(
        "css_support_container"
      );
      cssSupportContainer.innerText = prettier.format(supported, {
        parser: "yaml",
        plugins: prettierPlugins
      });
    });
  });
})();
