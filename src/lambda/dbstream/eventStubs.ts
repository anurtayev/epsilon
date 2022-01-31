import { ExtractedMeta } from "./extractMeta";

export const insertEvent = {
  Records: [
    {
      eventID: "c94eb5583d85261e02ce08cc5afd58f6",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1642954942,
        Keys: {
          id: {
            S: "media/honda1.jpg",
          },
        },
        NewImage: {
          tags: {
            L: [
              {
                S: "fav",
              },
              {
                S: "wicked",
              },
              {
                S: "randory",
              },
            ],
          },
          attributes: {
            L: [
              {
                L: [
                  {
                    S: "orientation",
                  },
                  {
                    S: "Horizontal (normal)",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "dateCreated",
                  },
                  {
                    S: "2021-10-05T18:27:23.000Z",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "width",
                  },
                  {
                    N: "4032",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "height",
                  },
                  {
                    N: "3024",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "latitude",
                  },
                  {
                    N: "43.81960555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "longitude",
                  },
                  {
                    N: "-79.49740555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "monthCreated",
                  },
                  {
                    N: "10",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "yearCreated",
                  },
                  {
                    N: "2021",
                  },
                ],
              },
            ],
          },
          id: {
            S: "media/honda1.jpg",
          },
        },
        SequenceNumber: "1624400000000022259668791",
        SizeBytes: 243,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:416904185688:table/epsilon-development-meta-table/stream/2022-01-23T05:08:07.866",
    },
  ],
};

export const insertEventResult: ExtractedMeta = [
  {
    attributes: new Set([
      { name: "orientation", value: "Horizontal (normal)" },
      { name: "dateCreated", value: "2021-10-05T18:27:23.000Z" },
      { name: "width", value: "4032" },
      { name: "height", value: "3024" },
      { name: "latitude", value: "43.81960555555556" },
      { name: "longitude", value: "-79.49740555555556" },
      { name: "monthCreated", value: "10" },
      { name: "yearCreated", value: "2021" },
    ]),

    tags: new Set(["fav", "wicked", "randory"]),

    id: "media/honda1.jpg",
  },
];

export const removeInsertEvent = {
  Records: [
    {
      eventID: "144352d492e08a33df9e0e98ba2c6d58",
      eventName: "REMOVE",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1643553749,
        Keys: {
          id: {
            S: "media/honda1.jpg",
          },
        },
        OldImage: {
          attributes: {
            L: [
              {
                L: [
                  {
                    S: "orientation",
                  },
                  {
                    S: "Horizontal (normal)",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "dateCreated",
                  },
                  {
                    S: "2021-10-05T18:27:23.000Z",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "width",
                  },
                  {
                    N: "4032",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "height",
                  },
                  {
                    N: "3024",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "latitude",
                  },
                  {
                    N: "43.81960555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "longitude",
                  },
                  {
                    N: "-79.49740555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "monthCreated",
                  },
                  {
                    N: "10",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "yearCreated",
                  },
                  {
                    N: "2021",
                  },
                ],
              },
            ],
          },
          id: {
            S: "media/honda1.jpg",
          },
        },
        SequenceNumber: "3001200000000017795706945",
        SizeBytes: 243,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:416904185688:table/epsilon-development-meta/stream/2022-01-29T21:00:29.989",
    },
    {
      eventID: "21bbde4fe930f47fc29fe302ff3b66e3",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1643553765,
        Keys: {
          id: {
            S: "media/honda1.jpg",
          },
        },
        NewImage: {
          attributes: {
            L: [
              {
                L: [
                  {
                    S: "orientation",
                  },
                  {
                    S: "Horizontal (normal)",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "dateCreated",
                  },
                  {
                    S: "2021-10-05T18:27:23.000Z",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "width",
                  },
                  {
                    N: "4032",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "height",
                  },
                  {
                    N: "3024",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "latitude",
                  },
                  {
                    N: "43.81960555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "longitude",
                  },
                  {
                    N: "-79.49740555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "monthCreated",
                  },
                  {
                    N: "10",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "yearCreated",
                  },
                  {
                    N: "2021",
                  },
                ],
              },
            ],
          },
          id: {
            S: "media/honda1.jpg",
          },
        },
        SequenceNumber: "3001300000000017795715115",
        SizeBytes: 243,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:416904185688:table/epsilon-development-meta/stream/2022-01-29T21:00:29.989",
    },
  ],
};

export const modifyEvent = {
  Records: [
    {
      eventID: "637be7e709a18ce27f249226e0f6a644",
      eventName: "MODIFY",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1642955697,
        Keys: {
          id: {
            S: "media/honda1.jpg",
          },
        },
        NewImage: {
          attributes: {
            L: [
              {
                L: [
                  {
                    S: "dateCreated",
                  },
                  {
                    S: "2021-10-05T18:27:23.000Z",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "width",
                  },
                  {
                    N: "4032",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "height",
                  },
                  {
                    N: "3024",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "latitude",
                  },
                  {
                    N: "43.81960555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "monthCreated",
                  },
                  {
                    N: "10",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "yearCreated",
                  },
                  {
                    N: "2021",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "ozon",
                  },
                  {
                    N: "20",
                  },
                ],
              },
            ],
          },
          id: {
            S: "media/honda1.jpg",
          },
          tags: {
            L: [
              {
                S: "wicked",
              },
              {
                S: "randory",
              },
              {
                S: "urchin",
              },
            ],
          },
        },
        OldImage: {
          tags: {
            L: [
              {
                S: "fav",
              },
              {
                S: "wicked",
              },
              {
                S: "flavonoid",
              },
              {
                S: "randory",
              },
            ],
          },
          attributes: {
            L: [
              {
                L: [
                  {
                    S: "orientation",
                  },
                  {
                    S: "Horizontal (normal)",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "dateCreated",
                  },
                  {
                    S: "2021-10-05T18:27:23.000Z",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "width",
                  },
                  {
                    N: "4032",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "height",
                  },
                  {
                    N: "3024",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "latitude",
                  },
                  {
                    N: "43.81960555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "longitude",
                  },
                  {
                    N: "-79.49740555555556",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "monthCreated",
                  },
                  {
                    N: "10",
                  },
                ],
              },
              {
                L: [
                  {
                    S: "yearCreated",
                  },
                  {
                    N: "2021",
                  },
                ],
              },
            ],
          },
          id: {
            S: "media/honda1.jpg",
          },
        },
        SequenceNumber: "1624500000000022260075204",
        SizeBytes: 494,
        StreamViewType: "NEW_AND_OLD_IMAGES",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:416904185688:table/epsilon-development-meta-table/stream/2022-01-23T05:08:07.866",
    },
  ],
};

export const modifyEventResult: ExtractedMeta = [
  {
    attributes: new Set([
      { name: "dateCreated", value: "2021-10-05T18:27:23.000Z" },
      { name: "width", value: "4032" },
      { name: "height", value: "3024" },
      { name: "latitude", value: "43.81960555555556" },
      { name: "monthCreated", value: "10" },
      { name: "yearCreated", value: "2021" },
      { name: "ozon", value: "20" },
    ]),
    deletedAttributes: new Set([
      { name: "longitude", value: "-79.49740555555556" },
      { name: "orientation", value: "Horizontal (normal)" },
    ]),

    tags: new Set(["wicked", "randory", "urchin"]),
    deletedTags: new Set(["fav", "flavonoid"]),

    id: "media/honda1.jpg",
  },
];
