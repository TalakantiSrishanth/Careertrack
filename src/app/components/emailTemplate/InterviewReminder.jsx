import {
  Html,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

export default function InterviewReminderEmail({ company, title, date }) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
        <Container style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
          <Heading style={{ color: "#333" }}>
            Interview Reminder
          </Heading>

          <Text>
            You have an upcoming interview:
          </Text>

          <Text><strong>Company:</strong> {company}</Text>
          <Text><strong>Position:</strong> {title}</Text>
          <Text><strong>Date:</strong> {date}</Text>

          <Text style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
            This is an automated reminder sent from CareerTrack.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
