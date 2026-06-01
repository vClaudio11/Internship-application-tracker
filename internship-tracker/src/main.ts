import './style.css'

const addButton = document.querySelector("#addApplication") as HTMLButtonElement;
const cancelButton = document.querySelector("#cancel") as HTMLButtonElement;
const form = document.querySelector(".form") as HTMLFormElement;
const formInner = document.querySelector(".form-inner") as HTMLDivElement;
const company = document.querySelector("#company") as HTMLInputElement;
const jobTitle = document.querySelector("#jobTitle") as HTMLInputElement;
const location = document.querySelector("#location") as HTMLInputElement;
const deadline = document.querySelector("#deadline") as HTMLInputElement;
const status = document.querySelector("#status") as HTMLSelectElement;
const applicationList = document.querySelector("#application-inner") as HTMLUListElement;

// Define application objects
type ApplicationStatus = "to apply" | "applied" | "interview" | "offer" | "rejected";
interface Application {
    id: number;
    company: string;
    jobTitle: string;
    location: string;
    deadline: string;
    status: ApplicationStatus;
}

const applications: Application[] = [];



// Toggle hidden class on form from add button and cancel
addButton.addEventListener('click', () => {
    formInner.classList.remove('hidden');
});

cancelButton.addEventListener('click', () => {
    formInner.classList.add('hidden');
});



// Add and store application data
form.addEventListener('submit', (e) => {
    // Prevent page reload on submission 
    e.preventDefault();
    
    const newApplication: Application = {
        id: Date.now(),
        company: company.value,
        jobTitle: jobTitle.value,
        location: location.value,
        deadline: deadline.value,
        status: status.value as ApplicationStatus
    }

    // Add new application to end of list, hide the form and render the new list
    applications.push(newApplication);
    formInner.classList.add("hidden");
    renderApplications();

});

function renderApplications(): void {
    // Clear contents of applicationList to prevent duplicates
    applicationList.innerHTML = "";


    
    for (const application of applications) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${application.company}</span>
                        <span>${application.jobTitle}</span>
                        <span>${application.location}</span>
                        <span>${application.deadline}</span>
                        <span>${application.status}</span>`;
        applicationList.appendChild(li);
    }
    
}
