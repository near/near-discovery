export default function configZendesk() {
  window.zESettings = {
    webWidget: {
      color: { theme: "#2b2f31" },
      offset: {
        horizontal: "20px",
        vertical: "20px",
        mobile: { horizontal: "5px", vertical: "100px", from: "right" },
      },
      contactForm: {
        attachments: true,
        title: { "*": "Feedback and Support" },
        fields: [
          //              { id: "email", prefill: { "*": "EMAIL HERE" } },
          {
            id: 13149356989591,
            prefill: { "*": localStorage.getItem("accountNameString") },
          },
        ],
      },
      launcher: {
        label: { "*": " " },
        mobile: { labelVisible: false },
      },
    },
  };

  // TODO: Add these styles to the iframe
  //     <style>
  //       .vsc-initialized div#Embed div button {
  //         opacity: .8;
  //       }
  //       .vsc-initialized div#Embed div button .Icon {
  //         padding-right: 0;
  //       }
  //     </style>

  // TODO: Add these styles to the iframe
  //     <style>
  //       .vsc-initialized div#Embed div button {
  //         opacity: .8;
  //       }
  //       .vsc-initialized div#Embed div button .Icon {
  //         padding-right: 0;
  //       }
  //     </style>
}
