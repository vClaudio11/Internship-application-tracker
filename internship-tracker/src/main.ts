import './style.css'

const addButton = document.querySelector("#addApplication") as HTMLButtonElement;
const cancelButton = document.querySelector("#cancel") as HTMLButtonElement;
const form = document.querySelector(".form") as HTMLFormElement;
const formInner = document.querySelector(".form-inner") as HTMLDivElement;
const company = document.querySelector(".company") as HTMLInputElement;
const jobTitle = document.querySelector(".jobTitle") as HTMLInputElement;
const location = document.querySelector(".location") as HTMLInputElement;
const deadline = document.querySelector(".deadline") as HTMLInputElement;
const status = document.querySelector(".select-status") as HTMLSelectElement;
const applicationList = document.querySelector("#application-inner") as HTMLUListElement;
const applied = document.querySelector("#appliedTo-count") as HTMLParagraphElement;
const inProgress = document.querySelector("#inProgress-count") as HTMLParagraphElement;
const completed = document.querySelector("#completed-count") as HTMLParagraphElement;
const companyList = document.querySelector(".company-list") as HTMLUListElement;

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
    updateCompanies();
});



function renderApplications(): void {
    // Clear contents of applicationList to prevent duplicates
    applicationList.innerHTML = "";

    // for each application in applications, create a new list element with the list properties
    for (const application of applications) {
        const li = document.createElement("li");
        li.dataset.id = String(application.id);
        li.innerHTML = `<span>${application.company}</span>
                        <span>${application.jobTitle}</span>
                        <span>${application.location}</span>
                        <span>${application.deadline}</span>
                        <select class="select-status">
                            <option value="to apply">To apply</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="" disabled selected hidden>${application.status}</option>
                        </select>`;
        applicationList.appendChild(li);
    }
    updateSummary();
}



// Update summary counters when statuses are changed
applicationList.addEventListener('change', (e) => {
    // Define target event as select element 
    const target = e.target as HTMLSelectElement;
    if (target.classList.contains("select-status")) {
        // Find the id of the list as id is on list not status
        const li = target.closest("li") as HTMLLIElement;
        const id = Number(li.dataset.id);

        // Find matching ID, check first for null event as find could be undefined
        let targetList = applications.find(a => a.id === id);
        if (!targetList) return;
        targetList.status = target.value as ApplicationStatus;
        renderApplications() 
    }
});



function updateSummary(): void {
    
    // Filter applications with statuses 
    let inProgressCount = applications.filter(a => a.status === "to apply" || a.status === "applied" || a.status === "interview").length;
    let completedCount = applications.filter(a => a.status === "offer" || a.status === "rejected").length;
    let appliedCount = applications.length;
    
    // Update values on screen
    inProgress.textContent = `In progress: ${inProgressCount}`;
    completed.textContent = `Completed: ${completedCount}`;
    applied.textContent = `Applied to: ${appliedCount}`;
}



function updateCompanies(): void {
    companyList.innerHTML = "";

    for (const application of applications) {
        const li = document.createElement("li");
        li.dataset.id = String(application.id);
        li.innerHTML = `<span>${application.company}</span>`;
        companyList.appendChild(li);
    }
}