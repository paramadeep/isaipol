import { useEffect, useState } from "react";
import { reportSpecsAtom } from "../states/reportAtom";

const DomainLoader = () => {
  const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";
  const CLIENT_ID = "";
  const API_KEY = "";
  const APP_ID = "";
  const [accessToken, setAccessToken] = useState(false);

  const pickerCallback = async (data) => {
    console.log(data);
    if (data.action === google.picker.Action.PICKED) {
      const document = data[google.picker.Response.DOCUMENTS][0];
      const fileId = document[google.picker.Document.ID];
      console.log(fileId);
    }
  };

  const [pickerInited, setPickerInited] = useState(false);

  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: async (response) => {
      if (response.error !== undefined) {
        throw response;
        //todo: error handling
      }
      console.log("*********** access_token ************")
      console.log(response.access_token)
      setAccessToken(response.access_token);
    },
  });

  useEffect(() => {
    gapi.load("client:picker", async () => {
      await gapi.client.load(
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
      );
      setPickerInited(true);
    });
    tokenClient.requestAccessToken({ prompt: "consent" });
  }, [tokenClient]);

  useEffect(() => {
    if (pickerInited && accessToken) {
      const view = new google.picker.View(google.picker.ViewId.DOCS);
      const picker = new google.picker.PickerBuilder()
        .setDeveloperKey(API_KEY)
        .setAppId(APP_ID)
        .setOAuthToken(accessToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }, [pickerInited, accessToken]);
};

export default DomainLoader;
